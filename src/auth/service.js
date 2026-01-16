import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const AuthService = {
  checkToken: async (playerId) => {
    const player = await prisma.player.findUnique({
      where: { id: playerId },
    });

    if (!player) {
      throw new Error("Player not found");
    }

    return {
      isLoggedIn: true,
      playerId,
      username: player.username,
      player: {
        id: player.id,
        email: player.email,
        username: player.username,
      },
    };
  },
};

export default AuthService;
