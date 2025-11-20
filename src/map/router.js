import  express from "express";
import  MapController from "./controller.js";

const router = express.Router();

router.get(
  "/getAll",
  MapController.getAll
);


export default  router;
