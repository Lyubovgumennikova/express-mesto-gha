const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorConflict = require('../errors/ErrorConflict');
const ValidationError = require('../errors/ValidationError');
const Unauthorized = require('../errors/Unauthorized');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

const { SALT_ROUNDS, JWT_SECRET } = require('../config/index');

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
    .catch(next);
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
      res.send({ jwt: token });
    })
    .catch(next);
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound('Запрашиваемый пользователь не найдена'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new Forbidden('Невалидный id '));
      } else {
        next(err);
      }
    });
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFound('Запрашиваемый пользователь не найден'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateProfiletUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    // req.params.id,
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Запрашиваемый пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatartUser = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Запрашиваемый пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('некорректные данные'));
      } else {
        next(err);
      }
    });
};
