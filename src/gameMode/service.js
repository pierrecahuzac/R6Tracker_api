import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const GameModeService = {
  getAll: async () => {
    const gameModes = await prisma.gameMode.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return gameModes;
  },
};

export default GameModeService;

