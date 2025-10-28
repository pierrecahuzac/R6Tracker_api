const AuthController = {
  checkToken: async (req, res) => {
    console.log(req.user.sub);

    const playerId = req.user.sub;

    return res.status(200).json({
      message: "player connected",
      isLoggedIn: true,
      playerId: req.user.sub,
      username: req.user.username,
    });
  },
};

module.exports = AuthController;
