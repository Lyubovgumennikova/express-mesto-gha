const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const register = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.notEmail');
      }
      return value;
    }).messages({
      'any.required': 'Email не указан',
      'string.notEmail': 'Email не корректный',
    }),
    password: Joi.string().required().min(6).messages({
      'any.required': 'Пароль не указан',
      'string.min': 'Пароль должен быть больше 5-ти символов',
    }),
  }),
});

const cards = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Имя карточки не указано',
        'string.min': 'Имя карточки должно быть больше 1-го символа',
        'string.max': 'Имя карточки не должно быть больше 30-ти символов',
      }),
    link: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value)) {
        return helper.error('string.notURL');
      }
      return value;
    }).messages({
      'any.required': 'Ссылка не указана',
      'string.notURL': 'Неправильный формат ссылки',
    }),
  }).unknown(true),
});

const avatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value)) {
        return helper.error('string.notURL');
      }
      return value;
    }).messages({
      'any.required': 'Ссылка не указана',
      'string.notURL': 'Неправильный формат ссылки',
    }),
  }),
});
// params: Joi.object().keys({
//   postId: Joi.string().alphanum().length(24),
// }),

module.exports = {
  register,
  cards,
  avatar,
};
