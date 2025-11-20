import express from "express";
import ActiveGameController from "./controller.js"
import authMiddleware from '../middleware/authMiddleware.js'

const  router =  express.Router();

router.get(
  "/", authMiddleware.decodeJWT,
  ActiveGameController.get
);
router.get(
  "/getAll", authMiddleware.decodeJWT,
  ActiveGameController.getAll
);
router.post(
  "/create",authMiddleware.decodeJWT,
  ActiveGameController.create
);

export default router

