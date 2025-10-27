const express = require("express");
const router = express.Router();
const MapController = require("./controller");

router.get(
  "/getAll",
  MapController.getAll
);


module.exports = router;
