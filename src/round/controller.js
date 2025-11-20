import prisma from '../../prisma/prismaClient.js' 
import calculateCurrentScore from '../functions.js'
const RoundController = {
  create: async (req, res) => {
    const sideChoosen = req.body.sideChoosen;
    const playerId = req.body.playerId;
    const gameId = req.body.gameId;
    console.log(req.body);

    if (playerId === "undefined") {
      return;
    }

    try {
      const lastRound = await prisma.round.findFirst({
        where: { gameId: gameId },
        orderBy: { roundNumber: "desc" },
        select: { roundNumber: true },
      });
      const newRoundNumber = (lastRound?.roundNumber || 0) + 1;

      const round = await prisma.round.create({
        data: {
          side: {
            connect: {
              name: sideChoosen,
            },
          },
          game: {
            connect: {
              id: gameId,
            },
          },
          roundNumber: newRoundNumber,
          player: {
            connect: {
              id: playerId,
            },
          },
        },
      });

      return res.status(201).json(round);
    } catch (error) {
      console.log(error);
    }
  },

  updateByGameId: async (req, res) => {
    const gameId = req.params.gameId;
    const { modeName, mapName } = req.body.data;

    const updateData = {};
    let mapIdToConnect = null;

    if (mapName) {
      const mapToFind = await prisma.map.findUnique({
        where: {
          name: mapName,
        },
        select: {
          id: true,
        },
      });

      if (!mapToFind) {
        return res
          .status(404)
          .json({ error: `Carte '${mapName}' non trouvée.` });
      }

      mapIdToConnect = mapToFind.id;
    }
    if (mapIdToConnect) {
      updateData.map = {
        connect: { id: mapIdToConnect },
      };
    }

    if (modeName) {
      updateData.mode = {
        connect: { name: modeName },
      };
    }

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ message: "Aucune donnée de mise à jour valide fournie." });
    }

    const gameToFindAndUpdate = await prisma.game.update({
      where: {
        id: gameId,
      },
      data: updateData,
    });

    return res.status(200).json(gameToFindAndUpdate);
  },

  updateRoundById: async (req, res) => {
    const { roundId } = req.params;
    const { round, isFinished, operatorId } = req.body;
    console.log(operatorId);

    // req.body {
    //   round: {
    //     id: '682cb2a1-e3d5-494e-89ea-f1db046bf044',
    //     gameId: '1050c205-f6ab-4645-bae0-f1c33973d88a',
    //     roundNumber: 1,
    //     sideId: '94c99cf1-7f2b-4d0a-8ab1-7cc1785bb3e5',
    //     sideName: '',
    //     winningSideId: null,
    //     operatorId: 'f9962a87-2c19-4337-a35d-33965a4fd678',
    //     kills: 1,
    //     death: true,
    //     assists: 2,
    //     disconnected: false,
    //     points: 120,
    //     roundResult: 'Victory',
    //     createdAt: '2025-11-13T19:39:48.127Z',
    //     playerId: '02472dcb-e873-4c2c-bb47-3579a3f15f62',
    //     isFinished: false,
    //     side: 'ATTACK',
    //     operator: {
    //       id: 'f9962a87-2c19-4337-a35d-33965a4fd678',
    //       name: 'Thermite',
    //       sideId: '94c99cf1-7f2b-4d0a-8ab1-7cc1785bb3e5',
    //       image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3NQW8lJVslVSaYSiBlAleU/09fd8e3e946f2e71f39182b9ff18dd77/r6-operators-list-thermite.png',
    //       icon: 'https://static.wikia.nocookie.net/rainbowsix/images/4/40/ThermiteIconN.png'
    //     }
    //   },
    //   isFinished: true
    // }

    try {
      const updatedRound = await prisma.round.update({
        where: { id: roundId },
        data: {
          kills: round.kills,
          assists: round.assists,
          roundNumber: Number(round.roundNumber),
          death: round.death,
          disconnected: round.disconnected,
          points: round.points,
          roundResult: round.roundResult,
          isFinished: req.body.isFinished ? true : false,
          operatorId: round.operatorId && round.operatorId,
        },
      });
      console.log(round.roundResult);

      if (round.roundResult !== null) {
        if (
          (
            round.roundResult.toUpperCase() === "VICTORY") ||
          round.roundResult.toUpperCase() === "DEFEAT"
        ) {
          const currentGame = await prisma.game.findUnique({
            where: { id: round.gameId },
            select: { playerScore: true, opponentScore: true },
          });
          console.log(currentGame);

          const currentPScore = currentGame.playerScore || 0;
          const currentOScore = currentGame.opponentScore || 0;
          const updateScoreInGame = await prisma.game.update({
            where: {
              id: round.gameId,
            },
            data: {
              playerScore:
                round.roundResult.toUpperCase() === "VICTORY"
                  ? currentPScore + 1
                  : currentPScore,

              opponentScore:
                round.roundResult.toUpperCase() === "DEFEAT"
                  ? currentOScore + 1
                  : currentOScore,
            },
          });
          console.log(updateScoreInGame);
        }
      }

      const { playerScore, opponentScore } = await calculateCurrentScore(
        updatedRound.gameId
      );
      const pScore = Number(playerScore);
      const oScore = Number(opponentScore);

      let gameStatus = "IN_PROGRESS";

      if (pScore === 4 && oScore <= 2) {
        gameStatus = "PLAYER_WON";
      } else if (oScore === 4 && pScore <= 2) {
        gameStatus = "PLAYER_LOST";
      } else if (pScore === 5 && pScore > oScore) {
        gameStatus = "PLAYER_WON";
      } else if (oScore === 5 && oScore > pScore) {
        gameStatus = "PLAYER_LOST";
      } else if (pScore === 5 && oScore === 5) {
        gameStatus = "MATCH_DRAW";
      } else if (pScore === 3 && oScore === 3) {
        gameStatus = "OVERTIME";
      } else if (req.body.forceDraw === true) {
        gameStatus = "MATCH_DRAW";
      }

      if (gameStatus !== "IN_PROGRESS") {
        const updateData = {
          status: gameStatus,
          playerScore: pScore,
          opponentScore: oScore,
        };

        if (gameStatus === "OVERTIME") {
          updateData.overtime = true;
        }
        console.log(updateData);

        const gameUpdated = await prisma.game.update({
          where: { id: updatedRound.gameId },
          data: updateData,
        });
        console.log(gameUpdated);
      }

      return res.status(200).json({
        updatedRound,
        gameStatus: gameStatus,

        finalScore: `${pScore}-${oScore}`,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du round:", error);
      throw error;
    }
  },

  findRoundsStatsByGameId: async (req, res) => {
    try {
      const gameId = req.params.gameId;

      const result = await prisma.round.findMany({
        where: {
          gameId,
        },
      });

      return res.status(200).json({
        result,
      });
    } catch (error) {}
  },
};

export default RoundController;
