const { PrismaClient } = require("@prisma/client");
const { connect } = require("./router");

const prisma = new PrismaClient();

const ActiveGameController = {
  get: async (req, res) => {
    const playerid = req.user.sub;
    const activeGame = await prisma.activeGame.findUnique({
      select: {
        playerid,
      },
    });

    console.log(activeGame);
    if (!activeGame) {
      return res.status(401).json("Not active game for this player");
    }

    return res.status(200).json(activeGame);
  },
  create: async (req, res) => {
    const { gameId } = req.body;

    const playerId = req.user.sub;
    console.log(gameId, playerId);
    const activeGame = await prisma.activeGame.create({
      data: {
        player: {
          connect: {
            id: playerId,
          },
        },
        game: {
          connect: {
            id: gameId,
          },
        },
      },
    });
    console.log(activeGame);

    if (!activeGame) {
      return res.status(401).json("Not active game for this player");
    }

    return res.status(200).json(activeGame);
  },
};

module.exports = ActiveGameController;
