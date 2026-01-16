import RoundService from './service.js';
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
      return res.status(201).json(round);
    } catch (error) {
      console.log(error);
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
      return res.status(200).json(result);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du round:", error);
      throw error;
    }
  },

  findRoundsStatsByGameId: async (req, res) => {
    try {
      const gameId = req.params.gameId;
      const result = await RoundService.findRoundsByGameId(gameId);
      return res.status(200).json({
        result,
      });
    } catch (error) {}
  },
};

export default RoundController;
