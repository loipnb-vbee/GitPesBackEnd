const router = require('express').Router();
const matchController = require('../controllers/match');
const asyncMiddleware = require('../middlewares/async');
/* eslint-disable prettier/prettier */

//router.post('/match', matchController.findAllMatch);
//router.post('/match/:id', matchController.findMatchesPlayer);
router.get('/match', asyncMiddleware(matchController.findAllMatches));
router.get('/match/:id', asyncMiddleware(matchController.findMatchesPlayer));
router.post('/match/save', asyncMiddleware(matchController.saveMatch));

/* eslint-enable prettier/prettier */

module.exports = router;
