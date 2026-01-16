import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const calculateCurrentScore = async (gameId) => {
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

  finishedRounds.forEach((round) => {
    if (round.roundResult === "Victory") {
      playerScore += 1;
    } else if (round.roundResult === "Defeat") {
      opponentScore += 1;
    } else if (round.roundResult === "Draw") {
      playerScore += 1;
      opponentScore += 1;
    }
  });

  return { playerScore, opponentScore };
};

export default calculateCurrentScore;
