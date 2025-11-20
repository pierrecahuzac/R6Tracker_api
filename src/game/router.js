import express from "express";
import GameController from "./controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

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


export default router;
