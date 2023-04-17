const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const {auth,authAccessToken } = require('../middlewares/auth');
const {registerValidate,loginValidate } = require('../validations/auth');
const authController = require('../controllers/auth');

/* eslint-disable prettier/prettier */
router.post('/auths/register',registerValidate,asyncMiddleware(authController.register));
router.post('/auths/login', loginValidate, asyncMiddleware(authController.login));
router.get('/auths/getacesstoken',authAccessToken,asyncMiddleware(authController.sendAccessToken));
router.get('/auths/verify',auth,asyncMiddleware(authController.sendAccessToken));
/* eslint-enable prettier/prettier */

module.exports = router;
