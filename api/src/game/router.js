const express = require("express");
const router = express.Router();
const GameController = require("./controller");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/create", authMiddleware.decodeJWT, GameController.create);

router.put(
  "/update/:gameId",
  authMiddleware.decodeJWT,
  GameController.updateByGameId
);

router.get(
  "/findByPlayerId",
  authMiddleware.decodeJWT,
  GameController.findByPlayerId
);
router.get(
  "/findGamesByPlayerId",
  authMiddleware.decodeJWT,
  GameController.findGamesByPlayerId
);

router.get("/findAll", authMiddleware.decodeJWT,GameController.findAll);

router.get("/:gameId", authMiddleware.decodeJWT, GameController.getGameById);


module.exports = router;
