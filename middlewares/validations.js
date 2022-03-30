const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const register = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helper) => {
        if (!validator.isEmail(value)) {
          return helper.error('string.notEmail');
        }
        return value;
      })
      .messages({
        'any.required': 'Email не указан',
        'string.notEmail': 'Email не корректный',
      }),
    password: Joi.string().required().min(6).messages({
      'any.required': 'Пароль не указан',
      'string.min': 'Пароль должен быть больше 5-ти символов',
    }),
  }),
});

const profiletUser = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      name: Joi.string().min(2).max(40)
        .messages({
          'any.required': 'Имя пользователя не указано',
          'string.min': 'Имя пользователя должно быть больше 1-го символа',
          'string.max': 'Имя пользователя не должно быть больше 40-ка символов',
        }),
      about: Joi.string().min(2).max(200)
        .messages({
          'any.required': 'Увлечение не указано',
          'string.min': 'Описание должно быть больше 1-го символа',
          'string.max': 'Описание не должно быть больше 200-т символов',
        }),
    })
    .unknown(true),
});

const cards = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30)
        .messages({
          'any.required': 'Имя карточки не указано',
          'string.min': 'Имя карточки должно быть больше 1-го символа',
          'string.max': 'Имя карточки не должно быть больше 30-ти символов',
        }),
      link: Joi.string()
        .required()
        .custom((value, helper) => {
          if (!validator.isURL(value)) {
            return helper.error('string.notURL');
          }
          return value;
        })
        .messages({
          'any.required': 'Ссылка не указана',
          'string.notURL': 'Неправильный формат ссылки',
        }),
    })
    .unknown(true),
});

const avatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required()
      .pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3)\.){3}\d{1,3})|((\w-?)+\[a-z0-9_-]{2,3})(:\d{2,5})?\/?#?/)
      .messages({
        'any.required': 'Ссылка не указана',
        'string.notURL': 'Неправильный формат ссылки',
      }),
  }),
});

module.exports = {
  register,
  profiletUser,
  cards,
  avatar,
};
