import GameService from "./service.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const GameController = {
  /**
   * POST /api/game/create - Crée une nouvelle partie
   */
  create: async (req, res) => {
    try {
      const playerId = req.body.playerId;
      const result = await GameService.createGame(playerId);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error creating game:", error.message);
      return res.status(400).json({ message: error.message });
    }
  },

  /**
   * PUT /api/game/update/:gameId - Met à jour une partie
   */
  updateByGameId: async (req, res) => {
    try {
      const gameId = req.params.gameId;
      const updateData = req.body.data || req.body;

      const updatedGame = await GameService.updateGameById(gameId, updateData);
      return res.status(200).json(updatedGame);
    } catch (error) {
      console.error("Error updating game:", error.message);
      return res
        .status(error.message.includes("not found") ? 404 : 400)
        .json({ message: error.message });
    }
  },

  /**
   * GET /api/game/findAll - Récupère tous les jeux non terminés
   */
  findAll: async (req, res) => {
    try {
      const games = await GameService.getAllGames();
      return res.status(200).json(games);
    } catch (error) {
      console.error("Error fetching games:", error.message);
      return res.status(500).json({ message: error.message });
    }
  },

  /**
   * GET /api/game/findGamesByPlayerId - Récupère les jeux du joueur connecté
   */
  findGamesByPlayerId: async (req, res) => {
    try {
      const playerId = req.user.sub;
      const games = await GameService.getGamesByPlayerId(playerId);
      return res.status(200).json(games);
    } catch (error) {
      console.error("Error fetching player games:", error.message);
      return res.status(500).json({ message: error.message });
    }
  },

  /**
   * GET /api/game/findByPlayerId - Alternative alias pour getGamesByPlayerId
   */
  findByPlayerId: async (req, res) => {
    try {
      const playerId = req.user.sub;
      const games = await GameService.getGamesByPlayerId(playerId);
      return res.status(200).json({
        message: "Games found",
        games,
      });
    } catch (error) {
      console.error("Error fetching player games:", error.message);
      return res.status(500).json({ message: error.message });
    }
  },

  /**
   * GET /api/game/:gameId - Récupère une partie par son ID
   */
  getGameById: async (req, res) => {
    try {
      const gameId = req.params.gameId;
      const game = await GameService.getGameById(gameId);
      return res.status(200).json({
        message: "Game found",
        gameById: game,
      });
    } catch (error) {
      console.error("Error fetching game:", error.message);
      return res
        .status(error.message.includes("not found") ? 404 : 500)
        .json({ message: error.message });
    }
  },
};

export default GameController;

