import  express from "express";
const router = express.Router();
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
