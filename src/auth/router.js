import {createRouter} from '../../createRouter.js'
const router = createRouter()

import  AuthController from "./controller.js";
import  authMiddleware from '../middleware/authMiddleware.js'

router.get("/me", authMiddleware.decodeJWT, AuthController.checkToken);


export default  router;
