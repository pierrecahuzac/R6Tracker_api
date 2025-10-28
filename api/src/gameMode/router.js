const express = require("express");
const router = express.Router();
const GameController = require("./controller");
const authMiddleware = require("../middleware/authMiddleware");


router.get(
  "/getAll", authMiddleware.decodeJWT,
  GameController.getAll
);


module.exports = router;
