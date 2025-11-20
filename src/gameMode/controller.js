
import prisma from '../../prisma/prismaClient.js' 

const GameModeController = {
  getAll: async (req, res) => {
    const gameModes = await prisma.gameMode.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return res.status(200).json(gameModes);
  },
};

export default GameModeController;
