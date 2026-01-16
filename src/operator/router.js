import {createRouter} from '../../createRouter.js'
const router = createRouter()
import  OperatorController from "./controller.js";

 
router.get(
  "/getAll",
  OperatorController.getAll
);
router.get(
  "/getAllOperatorsBySide/:side",
  OperatorController.getAllOperatorsBySide
);


export default  router;
