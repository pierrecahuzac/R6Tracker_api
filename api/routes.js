const express = require("express");
const router = express.Router();
const PlayerRouter = require("./src/player/router");
const GameModeRouter= require("./src/gameMode/router");
const MapRouter= require("./src/map/router");
const OperatorRouter= require("./src/operator/router");
const GameRouter= require("./src/game/router");
const RoundRouter= require("./src/round/router");


  router.get("/api/test", (req, res) => { // <-- AJOUTEZ CETTE LIGNE
    console.log("Teste DIRECT de l'API");
    return res.json({ status: "OK", message: "TEST OK" });
})



router.use("/api/player", PlayerRouter);
router.use("/api/gameMode", GameModeRouter);
router.use("/api/map", MapRouter);
router.use("/api/operator", OperatorRouter);
router.use("/api/game", GameRouter);
router.use("/api/round", RoundRouter);



module.exports = router;