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

    if (!activeGame) {
      return res.status(401).json("Not active game for this player");
    }

    return res.status(200).json(activeGame);
  },
  getAll: async (req, res) => {
    const activesGames = await prisma.activeGame.findMany({});

    if (!activesGames) {
      return res.status(401).json("Not actives games for this player");
    }
    return res.status(200).json(activesGames);
  },

  create: async (req, res) => {
    const playerId = req.user.sub;

    const actualActiveGame = await prisma.activeGame.findUnique({
      where: { playerId },
    });

    if (actualActiveGame) {
      const deleteActiveGame = await prisma.activeGame.delete({
        where: { id: actualActiveGame.id },
      });
    }

    const { gameId } = req.body;

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

    if (!activeGame) {
      return res.status(401).json("Not active game for this player");
    }

    return res.status(200).json(activeGame);
  },
};

module.exports = ActiveGameController;
