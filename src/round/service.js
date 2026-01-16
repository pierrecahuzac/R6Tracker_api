import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import calculateCurrentScore from '../functions.js'

const RoundService = {
  createRound: async (sideChoosen, playerId, gameId) => {
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

    return round;
  },

  updateRoundById: async (roundId, roundData, isFinished, gameId, forceDraw) => {
    const updatedRound = await prisma.round.update({
      where: { id: roundId },
      data: {
        kills: roundData.kills,
        assists: roundData.assists,
        roundNumber: Number(roundData.roundNumber),
        death: roundData.death,
        disconnected: roundData.disconnected,
        points: roundData.points,
        roundResult: roundData.roundResult,
        isFinished: isFinished ? true : false,
        operatorId: roundData.operatorId && roundData.operatorId,
      },
    });
    console.log(roundData.roundResult);

    if (roundData.roundResult !== null) {
      if (
        (
          roundData.roundResult.toUpperCase() === "VICTORY") ||
        roundData.roundResult.toUpperCase() === "DEFEAT"
      ) {
        const currentGame = await prisma.game.findUnique({
          where: { id: roundData.gameId },
          select: { playerScore: true, opponentScore: true },
        });
        console.log(currentGame);

        const currentPScore = currentGame.playerScore || 0;
        const currentOScore = currentGame.opponentScore || 0;
        const updateScoreInGame = await prisma.game.update({
          where: {
            id: roundData.gameId,
          },
          data: {
            playerScore:
              roundData.roundResult.toUpperCase() === "VICTORY"
                ? currentPScore + 1
                : currentPScore,

            opponentScore:
              roundData.roundResult.toUpperCase() === "DEFEAT"
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
    } else if (forceDraw === true) {
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

    return {
      updatedRound,
      gameStatus: gameStatus,
      finalScore: `${pScore}-${oScore}`,
    };
  },

  findRoundsByGameId: async (gameId) => {
    const result = await prisma.round.findMany({
      where: {
        gameId,
      },
    });

    return result;
  },
};

export default RoundService;

