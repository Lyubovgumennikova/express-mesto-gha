const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // _id: {
  //   type: String,
  // },
});

module.exports = mongoose.model('user', userSchema);
