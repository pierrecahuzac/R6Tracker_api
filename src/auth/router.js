const express = require("express");
const router = express.Router();
const AuthController = require("./controller");
const authMiddleware = require('../middleware/authMiddleware')
router.get("/me", authMiddleware.decodeJWT, AuthController.checkToken);

module.exports = router;
