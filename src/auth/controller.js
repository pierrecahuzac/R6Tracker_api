import AuthService from './service.js';

const AuthController = {
  checkToken: async (req, res) => {
    try {
      const playerId = req.user.sub;
      const result = await AuthService.checkToken(playerId);
      return res.status(200).json({
        message: "player connected",
        ...result,
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: error.message });
    }
  },
};

export default AuthController;

