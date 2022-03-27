/* eslint-disable semi */
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ErrorConflict = require('../errors/ErrorConflict');
const ValidationError = require('../errors/ValidationError');

const { ERROR_CODE, NOT_FOUND, SERVER_ERROR } = require('../error');

module.exports.createUser = (req, res, next) => {
  const {
    email, password, about, avatar, name,
  } = req.body;
  if (!email || !password) {
    next(new ValidationError('Неправильные почта или пароль'))
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
      // если такого пользователя нет,
      // сгенерируем исключение
        throw new ErrorConflict('Пользователь {email} уже зарегестрирован');
      }

      return bcrypt.hash(password, 10);
    })
    // .then((hash) => {
    //   return User.create({
    //     email,
    //     password: hash,
    //     about,
    //     avatar,
    //     name,
    //   });
    // })
    .then((hash) => User.create({
      email,
      password: hash,
      about,
      avatar,
      name,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.send({
      user,
      // email: user.email,
      // name: user.name,
      // about: user.about,
      // avatar: user.avatar,
      // _id: user._id,
      // password: user.password,
    }))
    .catch(next)
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new ValidationError('Неправильные почта или пароль'))
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      // сравниваем переданный пароль и хеш из базы
      return bcrypt.compare(password, user.password);
    })
    // .then((matched) => {
    //   if (!matched) {
    //     // хеши не совпали — отклоняем промис
    //     return Promise.reject(new Error('Неправильные почта или пароль'));
    //   }

  //   // аутентификация успешна
  //   res.send({ message: 'Всё верно!' });
  // })
  // .catch((err) => {
  //   res
  //     .status(401)
  //     .send({ message: err.message });
  // });

    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'некорректные данные' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
  // .catch((err) => res.status(400).send(err));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
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
    req.user._id,
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
    req.user._id,
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
