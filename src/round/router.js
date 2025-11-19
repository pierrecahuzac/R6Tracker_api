const express = require("express");
const router = express.Router();
const RoundController = require("./controller");


router.post(
  "/create",   
  RoundController.create
);
router.put(
  "/update/:roundId",   
  RoundController.updateRoundById
);

router.get("/:gameId", RoundController.findRoundsStatsByGameId)




module.exports = router;
