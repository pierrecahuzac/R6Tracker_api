import {createRouter} from '../../createRouter.js'
const router = createRouter()

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
