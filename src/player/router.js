// import express from "express";
// const router = express.Router();
import PlayerController from "./controller.js";

import {createRouter} from '../../createRouter.js'
const router = createRouter()
const { NODE_ENV } = process.env;

router.post("/signup", PlayerController.signup);
router.post("/login", PlayerController.login);
router.get("/findById/playerId/:playerId", PlayerController.findById);

if (NODE_ENV === "development") {
  router.get("/logout", PlayerController.logout);
}
router.post("/logout", PlayerController.logout);

export default router;
