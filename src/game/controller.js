import GameService from "./service.js";
import { respondSuccess, respondError } from "../utils/responseHandler.js";
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
      return respondSuccess(res, result, "Game created successfully", 201);
    } catch (error) {
      console.error("Error creating game:", error.message);
      return respondError(res, error.message, 400);
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
      return respondSuccess(res, updatedGame, "Game updated successfully");
    } catch (error) {
      console.error("Error updating game:", error.message);
      const statusCode = error.message.includes("not found") ? 404 : 400;
      return respondError(res, error.message, statusCode);
    }
  },

  /**
   * GET /api/game/findAll - Récupère tous les jeux non terminés
   */
  findAll: async (req, res) => {
    try {
      const games = await GameService.getAllGames();
      return respondSuccess(res, games, "Games retrieved successfully");
    } catch (error) {
      console.error("Error fetching games:", error.message);
      return respondError(res, error.message, 500);
    }
  },

  /**
   * GET /api/game/findGamesByPlayerId - Récupère les jeux du joueur connecté
   */
  findGamesByPlayerId: async (req, res) => {
    try {
      const playerId = req.user.sub;
      const games = await GameService.getGamesByPlayerId(playerId);
      return respondSuccess(res, games, "Player games retrieved successfully");
    } catch (error) {
      console.error("Error fetching player games:", error.message);
      return respondError(res, error.message, 500);
    }
  },

  /**
   * GET /api/game/findByPlayerId - Alternative alias pour getGamesByPlayerId
   */
  findByPlayerId: async (req, res) => {
    try {
      const playerId = req.user.sub;
      const games = await GameService.getGamesByPlayerId(playerId);
      return respondSuccess(res, games, "Games found");
    } catch (error) {
      console.error("Error fetching player games:", error.message);
      return respondError(res, error.message, 500);
    }
  },

  /**
   * GET /api/game/:gameId - Récupère une partie par son ID
   */
  getGameById: async (req, res) => {
    try {
      const gameId = req.params.gameId;
      const game = await GameService.getGameById(gameId);
      return respondSuccess(res, game, "Game found");
    } catch (error) {
      console.error("Error fetching game:", error.message);
      const statusCode = error.message.includes("not found") ? 404 : 500;
      return respondError(res, error.message, statusCode);
    }
  },
};

export default GameController;

