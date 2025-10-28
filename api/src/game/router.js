const express = require("express");
const router = express.Router();
const GameController = require("./controller");
const authMiddleware = require('../middleware/authMiddleware')
router.post("/create", GameController.create);
router.put("/update/:gameId", GameController.updateByGameId);
router.get("/findGamesByPlayerId/:playerId",authMiddleware.decodeJWT , GameController.findByPlayerId);

router.get("/findAll", GameController.findAll);

module.exports = router;
