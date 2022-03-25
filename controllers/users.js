const User = require('../models/user');

const {
  ERROR_CODE,
  NOT_FOUND,
  SERVER_ERROR,
} = require('../error');

module.exports.createUser = (req, res) => {
  const { about, avatar, name } = req.body;

  User.create({ about, avatar, name })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'некорректные данные' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId).then((user) => {
    if (!user) { return res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' }); }
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

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => {
      if (!user) { return res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' }); }
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

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) { return res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' }); }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'некорректные данные' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};
