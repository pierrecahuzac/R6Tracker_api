import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const GameService = {
  /**
   * Crée une nouvelle partie et définit le joueur comme actif
   */
  createGame: async (playerId) => {
    if (!playerId || playerId === "undefined") {
      throw new Error("Invalid playerId provided");
    }

    const player = await prisma.player.findUnique({
      where: { id: String(playerId) },
    });

    if (!player) {
      throw new Error("Player not found");
    }

    const game = await prisma.game.create({
      data: { playerId: player.id },
    });

    if (!game) {
      throw new Error("Failed to create game");
    }

    const updatedPlayer = await prisma.player.update({
      where: { id: playerId },
      data: { activeGameId: game.id },
      select: {
        id: true,
        email: true,
        username: true,
        language: true,
        activeGameId: true,
      },
    });

    return { game, updateActiveGamePlayer: updatedPlayer };
  },

  /**
   * Met à jour une partie (mode, map, roundNumber)
   */
  updateGameById: async (gameId, updateData) => {
    if (!gameId) {
      throw new Error("Game ID is required");
    }

    const { gameMode, map, roundNumber } = updateData;
    const data = {};

    if (map) {
      const mapFound = await prisma.map.findUnique({
        where: { name: map },
        select: { id: true },
      });

      if (!mapFound) {
        throw new Error(`Map '${map}' not found`);
      }

      data.mapId = mapFound.id;
    }

    if (gameMode) {
      const modeFound = await prisma.gameMode.findUnique({
        where: { name: gameMode },
        select: { id: true },
      });

      if (!modeFound) {
        throw new Error(`Game mode '${gameMode}' not found`);
      }

      data.modeId = modeFound.id;
    }

    if (roundNumber) {
      data.roundNumber = parseInt(roundNumber, 10);
    }

    if (Object.keys(data).length === 0) {
      throw new Error("No valid update data provided");
    }

    const updatedGame = await prisma.game.update({
      where: { id: gameId },
      data,
    });

    if (!updatedGame) {
      throw new Error("Game not found");
    }

    return updatedGame;
  },

  /**
   * Récupère tous les jeux non terminés
   */
  getAllGames: async () => {
    return await prisma.game.findMany({
      where: { isFinished: false },
    });
  },

  /**
   * Récupère tous les jeux d'un joueur avec détails complets
   */
  getGamesByPlayerId: async (playerId) => {
    return await prisma.game.findMany({
      where: { playerId },
      orderBy: { createdAt: "desc" },
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
          orderBy: { roundNumber: "asc" },
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
              select: { id: true, name: true, label: true },
            },
            operator: {
              select: { id: true, name: true, icon: true },
            },
          },
        },
      },
    });
  },

  /**
   * Récupère une partie par son ID avec tous les détails
   */
  getGameById: async (gameId) => {
    if (!gameId) {
      throw new Error("Game ID is required");
    }

    const game = await prisma.game.findUnique({
      where: { id: gameId },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        date: true,
        player: {
          select: {
            id: true,
            email: true,
            username: true,
            language: true,
          },
        },
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

    if (!game) {
      throw new Error("Game not found");
    }

    return game;
  },
};

export default GameService;

