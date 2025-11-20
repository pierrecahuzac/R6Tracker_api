import express from "express";
import GameController from "./controller.js";

const router = express.Router();

router.get(
  "/getAll",
  GameController.getAll
);


export default router;
