const router = require('express').Router();
const validations = require('../middlewares/validations');

const {
  createCard,
  getCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post('/cards', validations.cards, createCard);

router.get('/cards', getCard);
router.delete('/cards/:id', validations.index, deleteCard);
router.put('/cards/:id/likes', validations.index, likeCard);
router.delete('/cards/:id/likes', validations.index, dislikeCard);

module.exports = router;
