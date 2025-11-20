import  express from "express";
const router = express.Router();
import  RoundController from "./controller.js";


router.post(
  "/create",   
  RoundController.create
);
router.put(
  "/update/:roundId",   
  RoundController.updateRoundById
);

router.get("/:gameId", RoundController.findRoundsStatsByGameId)




export default  router;
