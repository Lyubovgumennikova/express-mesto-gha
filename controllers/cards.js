// const bcrypt = require('bcryptjs');
const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');

const Card = require('../models/card');
const { ERROR_CODE, NOT_FOUND, SERVER_ERROR } = require('../error');

module.exports.createCard = (req, res, next) => {
  const { name, link, owner } = req.body; // , userId  , owner
  Card.create({ name, link, owner }) // user:userId  owner: req.user._id
    .then((card) => res.send({ data: card }))
    // .catch(next);
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'некорректные данные' });
      }
      return next();
      // return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getCard = (req, res, next) => {
  Card.find({})
    // .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
  // .catch(() => res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFound('Запрашиваемая карточка не найдена'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) { // equals - метод mongoose
        throw new Forbidden('Нет прав доступа');
      } else {
        Card.deleteOne(card)
          .then(() => res.send({ data: card }));
      }
      // next(new Forbidden('Нет прав доступа'))
    })
    // .catch(next);
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new Forbidden('Невалидный id '));
      } else {
        next(err);
      }
    });
};

// module.exports.deleteCard = (err, req, res, next) => {
//   Card.findById(req.params.cardId)
//   // .orFail(new NotFound('Запрашиваемая карточка не найдена'))
//     .then((card) => {
//       if (!card) {
//         throw new NotFound('Запрашиваемая карточка не найдена');
//       }
//       if (String(card.owner) === req.user._id) {
//         Card.findByIdAndRemove(req.params.cardId).then((isValid) => {
//           if (!isValid) {
//             throw new Forbidden('Нет прав доступа');
//           }
//           res.send({ data: card });
//         });
//       }

//       // return next();
//       // next(new Error('Ошибка авторизации'));
//       // throw next();
//       next(err);
//     })
//     .catch(next);
//   // .catch((err) => {
//   //   if (err.name === 'CastError') {
//   //     return res.status(ERROR_CODE).send({ message: 'Невалидный id ' });
//   //   }
//   //   return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
//   // });
// };

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(NOT_FOUND)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'некорректные данные' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(NOT_FOUND)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.send({ data: card });
    })
    .catch(next);
  // .catch((err) => {
  //   if (err.name === 'CastError') {
  //     return res.status(ERROR_CODE).send({ message: 'некорректные данные' });
  //   }
  //   return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
  // });
};
