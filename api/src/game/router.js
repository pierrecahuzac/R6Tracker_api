const express = require("express");
const router = express.Router();
const GameController = require("./controller");

router.post("/create", GameController.create);
router.put("/update/:gameId", GameController.updateByGameId);

router.get("/findAll", GameController.findAll);

module.exports = router;
