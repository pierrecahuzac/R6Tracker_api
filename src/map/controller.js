
import MapService from './service.js';
import { respondSuccess, respondError } from '../utils/responseHandler.js';

const MapController = {
  getAll: async (req, res) => {
    try {
      const maps = await MapService.getAll();
      return respondSuccess(res, maps, "Maps retrieved successfully");
    } catch (error) {
      console.log(error);
      return respondError(res, error.message, 500);
    }
  },
};

export default MapController;
