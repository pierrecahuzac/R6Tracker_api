const express = require("express");
const router = express.Router();
const GameController = require("./controller");
const authMiddleware = require('../middleware/authMiddleware')
router.post("/create",authMiddleware.decodeJWT, GameController.create);
router.put("/update/:gameId",authMiddleware.decodeJWT, GameController.updateByGameId);
router.get("/findGamesByPlayerId/:playerId",authMiddleware.decodeJWT , GameController.findByPlayerId);

router.get("/findAll",authMiddleware.decodeJWT, GameController.findAll);

module.exports = router;
