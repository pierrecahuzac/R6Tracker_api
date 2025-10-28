const express = require("express");
const router = express.Router();
const RoundController = require("./controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", RoundController.create);
router.put(
  "/update/:roundId",
  authMiddleware.decodeJWT,
  RoundController.updateRoundById
);

router.get(
  "/:gameId",
  authMiddleware.decodeJWT,
  RoundController.findRoundsStatsByGameId
);

module.exports = router;
