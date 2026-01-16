
import GameModeService from './service.js';
import { respondSuccess, respondError } from '../utils/responseHandler.js';

const GameModeController = {
  getAll: async (req, res) => {
    try {
      const gameModes = await GameModeService.getAll();
      return respondSuccess(res, gameModes, "Game modes retrieved successfully");
    } catch (error) {
      console.log(error);
      return respondError(res, error.message, 500);
    }
  },
};

export default GameModeController;
