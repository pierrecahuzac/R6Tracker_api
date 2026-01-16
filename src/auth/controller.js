import AuthService from './service.js';
import { respondSuccess, respondError } from '../utils/responseHandler.js';

const AuthController = {
  checkToken: async (req, res) => {
    try {
      const playerId = req.user.sub;
      const result = await AuthService.checkToken(playerId);
      
      // On garde la version propre utilisant le helper de réponse
      return respondSuccess(res, result, "Player connected");
    } catch (error) {
      console.log(error);
      return respondError(res, error.message, 401);
    }
  },
};

export default AuthController;

