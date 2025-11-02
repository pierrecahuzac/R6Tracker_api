const express = require("express");
const router = express.Router();
const PlayerController = require("./controller");
const authMiddleware = require("../middleware/authMiddleware");

const { NODE_ENV } = process.env;

router.post("/signup", PlayerController.signup);
router.post("/login", PlayerController.login);
router.get(
  "/findById/playerId/:playerId",
  authMiddleware.decodeJWT,
  PlayerController.findById
);

// if (NODE_ENV === "development") {
  // router.get("/logout/", authMiddleware.decodeJWT, PlayerController.logout);
// }
router.post("/logout/", authMiddleware.decodeJWT, PlayerController.logout);

module.exports = router;
