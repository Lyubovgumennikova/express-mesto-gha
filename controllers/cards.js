const Card = require('../models/card');

const ERROR_CODE = 400;

module.exports.createCard = (req, res) => {
  const { name, link } = req.body; // , userId
  Card.create({ name, link, owner: req.user._id }) // user:userId
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(ERROR_CODE).send({ message: 'некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getCard = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res.status(ERROR_CODE).send({ message: 'некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: 'Запрашиваемая карточка не найдена' });
      }
      return res.send({ });
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  (req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true })
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: 'Запрашиваемая карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    }),
);

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  (req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true })
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: 'Запрашиваемая карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    }),
);
