/* eslint-disable semi */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorConflict = require('../errors/ErrorConflict');
// const ValidationError = require('../errors/ValidationError');
const Unauthorized = require('../errors/Unauthorized');
// const validators = require('../middlewares/validations');

const { SALT_ROUNDS, JWT_SECRET } = require('../config/index');
const { ERROR_CODE, NOT_FOUND, SERVER_ERROR } = require('../error');
// const user = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const {
    email, password, about, avatar, name,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ErrorConflict('Пользователь с таким email уже зарегестрирован');
      }
      return bcrypt.hash(password, SALT_ROUNDS);
    })
    .then((hash) => User.create({
      email,
      password: hash,
      about,
      avatar,
      name,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.send({ data: user }))
    .catch(next)
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  // return User.findUserByCredentials({ email, password })
  User.findOne({ email }, 'password ')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильные почта или парольg');
      }
      // сравниваем переданный пароль и хеш из базы
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильные почта или пароль');
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ jwt: token })
    })
    .catch(next)
}

module.exports.getUserId = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'некорректные данные' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getUser = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.updateProfiletUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    // req.params.id,
    { _id: req.params.id },
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'некорректные данные' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatartUser = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.params.id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'некорректные данные' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};
