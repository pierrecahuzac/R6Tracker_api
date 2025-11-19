const express = require("express");
const router = express.Router();
const GameController = require("./controller");


router.get(
  "/getAll",
  GameController.getAll
);


module.exports = router;
