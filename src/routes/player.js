const router = require('express').Router();
const playerController = require('../controllers/player');
const asyncMiddleware = require('../middlewares/async');
/* eslint-disable prettier/prettier */
router.get('/player', asyncMiddleware(playerController.findAll));
router.get('/player/ranking',asyncMiddleware(playerController.getRankingPlayer));
/* eslint-enable prettier/prettier */

module.exports = router;
