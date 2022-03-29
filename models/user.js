const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const Unauthorized = require('../errors/Unauthorized');
const isEmail = require('validator/lib/isEmail');

// const { Schema } = mongoose;

// const userSchema = new Schema({
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    default: 'password',
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    // validate: {
    //   validator: (v) => URL(v),
    //   message: 'Неправильный формат ссылки',
    // },
  },
});

// userSchema.statics.findUserByCredentials = function (email, password) {
//   return this.findOne({ email, password })
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new Error('Неправильные почта или пароль'));
//         // throw new Unauthorized('Неправильные почта или парольg');
//       }

//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             return Promise.reject(new Error('Неправильные почта или пароль'));
//             // throw new Unauthorized('Неправильные почта или пароль');
//           }

//           return user;
//         });
//     });
// };

module.exports = mongoose.model('user', userSchema);
