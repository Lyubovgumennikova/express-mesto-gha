const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const cardSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      default: [],
    },
  ],
  link: {
    type: String,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
