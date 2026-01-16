import OperatorService from './service.js';

const OperatorController = {
  getAll: async (req, res) => {
    try {
      const operators = await OperatorService.getAll();
      return res.status(200).json(operators);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },

  getAllOperatorsBySide: async (req, res) => {
    const sideChoosen = req.params.side;
    
    try {
      const operators = await OperatorService.getAllOperatorsBySide(sideChoosen);
      return res.status(200).json(operators);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: error.message });
    }
  },
};

export default OperatorController;
