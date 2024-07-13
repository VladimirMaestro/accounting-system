const express = require('express');
const passport = require('passport');
const controller = require('../controllers/analytics');
const router = express.Router();

//localhost:5000/api/auth/overview
router.get('/overview',passport.authenticate('jwt',{session: false}) ,controller.overview);

//localhost:5000/api/auth/analytics
router.get('/analytics',passport.authenticate('jwt',{session: false}) ,controller.analytics);

module.exports = router