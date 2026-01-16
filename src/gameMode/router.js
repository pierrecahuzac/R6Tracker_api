import {createRouter} from '../../createRouter.js'
const router = createRouter()

import GameController from "./controller.js";



router.get(
  "/getAll",
  GameController.getAll
);


export default router;
