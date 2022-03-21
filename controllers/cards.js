// const Card = require('../models/card');

// // module.exports.createCard = (req, res) => {
// //   console.log(req.user._id); // _id станет доступен
// // };

// module.exports.createCard = (req, res) => {
//   const { name, link } = req.body;
//   // eslint-disable-next-line no-underscore-dangle
//   console.log(req.user._id);

//   Card.create({ name, link }).then((card) => res.send({ data: card }))
//     .then((card) => res.send({ data: card }))
//     .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
// };

// module.exports.deleteCard = (req, res) => {
//   Card.findByIdAndRemove(req.params.id).then((card) => res.send({ data: card }));
//   // .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
// };

// module.exports.getCard = (req, res) => {
//   Card.find({})
//     .then((card) => res.send({ data: card }))
//     .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
// };

// module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
//   req.params.cardId,
//   { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
//   { new: true },
// );

// module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
//   req.params.cardId,
//   { $pull: { likes: req.user._id } }, // убрать _id из массива
//   { new: true },
// );
