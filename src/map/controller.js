
import MapService from './service.js';

const MapController = {
  getAll: async (req, res) => {
    try {
      const maps = await MapService.getAll();
      return res.status(200).json(maps);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
};

export default MapController;
