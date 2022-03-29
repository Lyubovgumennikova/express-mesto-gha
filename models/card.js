const mongoose = require('mongoose');

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
    required: true,
    // validate: {
    //   validator: (v) => URL(v),
    //   message: 'Неправильный формат ссылки',
    // },
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
