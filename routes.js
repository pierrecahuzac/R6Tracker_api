import express from 'express';
import PlayerRouter from './src/player/router.js';
import GameModeRouter from './src/gameMode/router.js';
import MapRouter from './src/map/router.js';
import OperatorRouter from './src/operator/router.js';
import GameRouter from './src/game/router.js';
import RoundRouter from './src/round/router.js';
import AuthRouter from './src/auth/router.js';
import ActiveGameRouter from './src/activeGame/router.js';

const router = express.Router();

router.get('/api/test', (req, res) => {
  return res.json({ status: 'OK', message: 'TEST OK' });
});

router.use('/api/player', PlayerRouter);
router.use('/api/gameMode', GameModeRouter);
router.use('/api/activeGame', ActiveGameRouter);
router.use('/api/map', MapRouter);
router.use('/api/operator', OperatorRouter);
router.use('/api/game', GameRouter);
router.use('/api/round', RoundRouter);
router.use('/api/auth', AuthRouter);

export default router;
