const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const AuthController = {
  checkToken: async (req, res) => {
    const playerId = req.user.sub;

    const player = await prisma.player.findUnique({
      where: {
        id: playerId,
      },
      include: {
        activeGame: {
          select: {
            id: true,
            gameId:true
          },
        },
      },
    });
   
    delete player.password;
    return res.status(200).json({
      message: "player connected",
      isLoggedIn: true,
      playerId,
      username: req.user.username,
      player,
    });
  },
};

module.exports = AuthController;

