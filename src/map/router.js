import {createRouter} from '../../createRouter.js'
const router = createRouter()
import  MapController from "./controller.js";



router.get(
  "/getAll",
  MapController.getAll
);


export default  router;
