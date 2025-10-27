const express = require("express");
const router = express.Router();
const OperatorController = require("./controller");


router.get(
  "/getAll",
  OperatorController.getAll
);
router.get(
  "/getAllOperatorsBySide/:side",
  OperatorController.getAllOperatorsBySide
);


module.exports = router;
