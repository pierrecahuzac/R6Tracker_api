import RoundService from './service.js';
import { respondSuccess, respondError } from '../utils/responseHandler.js';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const RoundController = {
  create: async (req, res) => {
    const sideChoosen = req.body.sideChoosen;
    const playerId = req.body.playerId;
    const gameId = req.body.gameId;

    if (playerId === "undefined") {
      return;
    }

    try {
      const round = await RoundService.createRound(sideChoosen, playerId, gameId);
      return respondSuccess(res, round, "Round created", 201);
    } catch (error) {
      console.log(error);
      return respondError(res, error.message, 400);
    }
  },

  updateRoundById: async (req, res) => {
    const { roundId } = req.params;
    const { round, isFinished } = req.body;

    try {
      const result = await RoundService.updateRoundById(
        roundId,
        round,
        isFinished,
        round.gameId,
        req.body.forceDraw
      );
      return respondSuccess(res, result, "Round updated successfully");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du round:", error);
      return respondError(res, error.message, 400);
    }
  },

  findRoundsStatsByGameId: async (req, res) => {
    try {
      const gameId = req.params.gameId;
      const result = await RoundService.findRoundsByGameId(gameId);
      return respondSuccess(res, result, "Rounds retrieved successfully");
    } catch (error) {
      console.log(error);
      return respondError(res, error.message, 500);
    }
  },
};

export default RoundController;
