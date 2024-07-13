const express = require('express');
const passport = require('passport');
const controller = require('../controllers/position');
const router = express.Router();

//localhost:5000/api/auth/getByCategoryId
router.get('/:categoryId',passport.authenticate('jwt',{session: false}) ,controller.getByCategoryId);
//localhost:5000/api/auth/create
router.post('/',passport.authenticate('jwt',{session: false}) ,controller.create);
//localhost:5000/api/auth/update
router.patch('/:id',passport.authenticate('jwt',{session: false}) ,controller.update);
//localhost:5000/api/auth/remove
router.delete('/:id',passport.authenticate('jwt',{session: false}) ,controller.remove);


module.exports = router