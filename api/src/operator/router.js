const express = require("express");
const router = express.Router();
const OperatorController = require("./controller");
const authMiddleware = require("../middleware/authMiddleware");


router.get(
  "/getAll", authMiddleware.decodeJWT,
  OperatorController.getAll
);
router.get(
  "/getAllOperatorsBySide/:side",
  authMiddleware.decodeJWT,
  OperatorController.getAllOperatorsBySide
);


module.exports = router;
