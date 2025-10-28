const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const GameController = {
  create: async (req, res) => {
    try {
      const playerId = req.body.playerId;

      if (playerId === "undefined") {
        return;
      }

      const playerToFind = await prisma.player.findUnique({
        where: {
          id: String(playerId),
        },
      });

      const game = await prisma.game.create({
        data: {
          playerId: playerToFind.id,
        },
      });

      return res.status(201).json(game);
    } catch (error) {
      console.log(error);
    }
  },

  updateByGameId: async (req, res) => {
    try {
      const gameId = req.params.gameId;
      //console.log(req.body);

      const { gameMode, map } = req.body.data || {};
      const roundNumber = req.body || 0;
      // console.log(gameMode, map, roundNumber);

      const updateData = {};
      let mapIdToConnect = null;

      if (map) {
        const mapToFind = await prisma.map.findUnique({
          where: {
            name: map,
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

      if (mapIdToConnect) {
        updateData.map = {
          connect: { id: mapIdToConnect },
        };
      }

      if (gameMode) {
        updateData.mode = {
          connect: { name: gameMode },
        };
      }
      if (roundNumber) {
        updateData.roundNumber = parseInt(roundNumber, 10);
      }

      // 🚨 GÉRER LES CAS OÙ AUCUNE DONNÉE N'EST FOURNIE :
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
      if (!gameToFindAndUpdate) {
        return res.status(404).json("Partie non trouvée");
      }
      return res.status(200).json(gameToFindAndUpdate);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  findAll: async (req, res) => {
    try {
      const games = await prisma.game.findMany({
        where: {
          isFinished: false,
        },
      });
      return res.status(200).json(games);
    } catch (error) {
      throw error;
    }
  },
  findByPlayerId: async (req, res) => {
    try {
      const playerId = req.params.playerId;
      const games = await prisma.game.findMany({
        where: {
          playerId,
        },
      });
      return res.status(200).json({
        message: "Games founded",
        games,
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = GameController;
