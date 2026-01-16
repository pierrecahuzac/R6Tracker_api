import OperatorService from './service.js';
import { respondSuccess, respondError } from '../utils/responseHandler.js';

const OperatorController = {
  getAll: async (req, res) => {
    try {
      const operators = await OperatorService.getAll();
      return respondSuccess(res, operators, "Operators retrieved successfully");
    } catch (error) {
      console.log(error);
      return respondError(res, error.message, 500);
    }
  },

  getAllOperatorsBySide: async (req, res) => {
    const sideChoosen = req.params.side;
    
    try {
      const operators = await OperatorService.getAllOperatorsBySide(sideChoosen);
      return respondSuccess(res, operators, "Operators retrieved successfully");
    } catch (error) {
      console.log(error);
      return respondError(res, error.message, 404);
    }
  },
};

export default OperatorController;
