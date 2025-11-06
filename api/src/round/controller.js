const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const RoundController = {
  create: async (req, res) => {
    const sideChoosen = req.body.sideChoosen;

    const playerId = req.body.playerId;
    const gameId = req.body.gameId;

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
    const { modeName, mapName } = req.body.data; // 🚨

    // 1. Initialiser l'objet de mise à jour des données
    const updateData = {};
    let mapIdToConnect = null;

    // ===================================================
    // 2. LOGIQUE POUR LA CARTE (Map)
    // ===================================================
    // 🚨 CORRECTION LOGIQUE: La condition pour vérifier si 'mapName' est fourni et non nul
    if (mapName) {
      // 🚨 CORRECTION SYNTAXE: Le champ unique dans le modèle Map est 'name', pas 'map'
      const mapToFind = await prisma.map.findUnique({
        where: {
          name: mapName, // Utilise le nom de la carte pour la trouver
        },
        select: {
          id: true,
        },
      });

      if (!mapToFind) {
        // Gérer le cas où la carte n'existe pas
        return res
          .status(404)
          .json({ error: `Carte '${mapName}' non trouvée.` });
      }

      mapIdToConnect = mapToFind.id;
    }

    // ===================================================
    // 3. CONSTRUCTION DE L'OBJET DATA POUR PRISMA
    // ===================================================

    // Mettre à jour la Carte (si mapIdToConnect est défini)
    if (mapIdToConnect) {
      updateData.map = {
        connect: { id: mapIdToConnect },
      };
    }
    // Si mapName était nul/vide et que vous voulez dissocier (déconnecter) la map:
    /* else if (mapName === null) {
        updateData.map = { disconnect: true };
    } */

    // Mettre à jour le Mode (si modeName est défini)
    if (modeName) {
      // Puisque 'name' est unique dans GameMode, cette syntaxe est CORRECTE.
      updateData.mode = {
        connect: { name: modeName },
      };
    }

    // 🚨 GÉRER LES CAS OÙ AUCUNE DONNÉE N'EST FOURNIE :
    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ message: "Aucune donnée de mise à jour valide fournie." });
    }

    // ===================================================
    // 4. EXÉCUTION DE LA MISE À JOUR
    // ===================================================
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
    const { round, isFinished } = req.body;

    try {
      const updatedRound = await prisma.round.update({
        where: { id: roundId },
        data: {
          kills: round.kills,
          assists: round.assists,
          roundNumber: round.roundNumber,
          death: round.death,
          disconnected: round.disconnected,
          points: round.points,
          roundResult: round.roundResult,
          isFinished: req.body.isFinished ? true : false,
          operatorId: round.operatorId,
        },
      });

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

        await prisma.game.update({
          where: { id: updatedRound.gameId },
          data: updateData,
        });
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

module.exports = RoundController;

const calculateCurrentScore = async (gameId) => {
  // 1. Récupérer tous les rounds terminés pour ce jeu
  const finishedRounds = await prisma.round.findMany({
    where: {
      gameId: gameId,
      isFinished: true,
    },
    select: {
      roundResult: true,
    },
  });

  let playerScore = 0;
  let opponentScore = 0;

  // 2. Calculer le score
  finishedRounds.forEach((round) => {
    if (round.roundResult === "Victory") {
      playerScore += 1;
    } else if (round.roundResult === "Defeat") {
      opponentScore += 1;
    } else if (round.roundResult === "Draw") {
      // Un point pour chaque camp en cas d'égalité (selon votre règle)
      playerScore += 1;
      opponentScore += 1;
    }
  });

  return { playerScore, opponentScore };
};
