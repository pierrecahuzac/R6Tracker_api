
import GameModeService from './service.js';

const GameModeController = {
  getAll: async (req, res) => {
    try {
      const gameModes = await GameModeService.getAll();
      return res.status(200).json(gameModes);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
};

export default GameModeController;
