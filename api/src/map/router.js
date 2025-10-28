const express = require("express");
const router = express.Router();
const MapController = require("./controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/getAll", authMiddleware.decodeJWT,
  MapController.getAll
);


module.exports = router;
