const express = require("express");
const router = express.Router();
const PlayerController = require("./controller");

const { NODE_ENV } = process.env;

router.post("/signup", PlayerController.signup);
router.post("/login", PlayerController.login);
router.get("/findById/playerId/:playerId", PlayerController.findById);

if (NODE_ENV === "development") {
  router.get("/logout/:playerId", PlayerController.logout);
}
router.post("/logout/:playerId", PlayerController.logout);

module.exports = router;
