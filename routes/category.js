const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const controller = require('../controllers/category');
const router = express.Router();
// const upload = require("multer")({ dest: 'uploads/' });

//localhost:5000/api/auth/getALL
router.get('/',passport.authenticate('jwt',{session: false}) , controller.getALL);
//localhost:5000/api/auth/getById
router.get('/:id',passport.authenticate('jwt',{session: false}) ,controller.getById);
//localhost:5000/api/auth/remove
router.delete('/:id',passport.authenticate('jwt',{session: false}) ,controller.remove);
//localhost:5000/api/auth/create
//router.post('/register',controller.create);
router.post('/',
    passport.authenticate('jwt',{session: false}),
    upload.single('image'),
    controller.create
);
//localhost:5000/api/auth/update
router.patch('/:id',passport.authenticate('jwt',{session: false}) ,upload.single('image'),controller.update);

module.exports = router