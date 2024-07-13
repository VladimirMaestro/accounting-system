const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const keys = require("../config/keys");
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {
  //   res.status(200).json({
  //     login: {
  //       email: req.body.email,
  //       password: req.body.password,
  //     },
  //   });
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    //проверяем пароль,пользователь существует

    const passwordResult = bcrypt.compareSync(req.body.password,candidate.password);
    if (passwordResult) {
      //генерация токена,пароли совпали

const token= jwt.sign({
    email: candidate.email,
    userId : candidate._id
}, keys.jwt, { expiresIn: 60*60 })

res.status(200).json({
    token: `Bearer ${token}`
})

    } else {
      //пароли не совпали
      res.status(401).json({
        message: "пароли не совпадают.Пробуйте снова",
      });
    }
  } else {
    //пользователя нет.ошибка
    res.status(404).json({
      message: "пользователь с таким email не найден.",
    });
  }
};

module.exports.register = async function (req, res) {
  // async?

  // res.status(200).json({
  //     register: 'from controller'
  // })

  //email password

  // const user = new User({
  //   email: req.body.email,
  //   password: req.body.password
  // })

  // user.save().then(()=> console.log('User create'))

  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    //пользователь существует,нужно отправить ошибку
    res.status(409).json({
      message: "Такой email уже занят",
    });
  } else {
    //нужно создать пользователя
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;

    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      //обработать ошибку
      errorHandler(res,e);
    }
  }
};
