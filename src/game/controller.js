import prisma from '../../prisma/prismaClient.js' 

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

      const { gameMode, map } = req.body.data || {};
      const roundNumber = req.body || 0;

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
  findGamesByPlayerId: async (req, res) => {
    const playerId = req.user.sub;
    try {      
      const games = await prisma.game.findMany({
        where: {
          playerId
        },
        select: {
          createdAt: true,
          date: true,
          id: true,
          isFinished: true,
          mode: true,
          opponentScore: true,
          overtime: true,
          platformId: true,
          playerId: true,
          playerScore: true,
          status: true,
          updatedAt: true,
          map: true,
          rounds: {
            select: {
              id: true,
              roundNumber: true,
              roundResult: true,
              kills: true,
              death: true,
              assists: true,
              disconnected: true,
              points: true,
              isFinished: true,
              side: {
                select: {
                  id: true,
                  name: true,
                  label: true,
                },
              },

              operator: {
                select: {
                  id: true,
                  name: true,
                  icon: true,
                },
              },
            },
          },
        },
      });
      console.log(games);
      
      return res.status(200).json(games);
    } catch (error) {
      throw error;
    }
  },
  
  findByPlayerId: async (req, res) => {
    try {
      const playerId = req.user.sub;
      const games = await prisma.game.findMany({
        where: {
          playerId,
        },
        select: {
          createdAt: true,
          date: true,
          id: true,
          isFinished: true,
          mode: true,
          opponentScore: true,
          overtime: true,
          platformId: true,
          playerId: true,
          playerScore: true,
          status: true,
          updatedAt: true,
          map: true,
          rounds: {
            select: {
              id: true,
              roundNumber: true,
              roundResult: true,
              kills: true,
              death: true,
              assists: true,
              disconnected: true,
              points: true,
              isFinished: true,
              side: {
                select: {
                  id: true,
                  name: true,
                  label: true,
                },
              },

              operator: {
                select: {
                  id: true,
                  name: true,
                  icon: true,
                },
              },
            },
          },
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
  getGameById: async (req, res) => {
    const playerId = req.user.sub;

    const gameId = req.params.gameId;
    try {
      const gameById = await prisma.game.findUnique({
        where: {
          id: gameId,
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          date: true,
          player: true,
          mapId: true,
          modeId: true,
          platformId: true,
          accountId: true,
          playerScore: true,
          opponentScore: true,
          status: true,
          overtime: true,
          roundNumber: true,
          isFinished: true,
          rounds: true,
          map: true,
          mode: true,
        },
      });
      return res.status(200).json({
        message: "Game founded",
        gameById,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default  GameController;
