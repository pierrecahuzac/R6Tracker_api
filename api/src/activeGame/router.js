const express = require("express");
const router = express.Router();
const ActiveGameController = require("./controller");
const authMiddleware = require('../middleware/authMiddleware')


router.get(
  "/", authMiddleware.decodeJWT,
  ActiveGameController.get
);
router.get(
  "/getAll", authMiddleware.decodeJWT,
  ActiveGameController.getAll
);
router.post(
  "/create",authMiddleware.decodeJWT,
  ActiveGameController.create
);


module.exports = router;
