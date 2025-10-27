const express = require("express");
const router = express.Router();
const PlayerController = require("./controller");



router.post(
  "/signup",
  PlayerController.signup
);
router.post(
  "/login",
  PlayerController.login
);
router.get(
  "/findById/playerId/:playerId",
  PlayerController.findById
);


module.exports = router;
