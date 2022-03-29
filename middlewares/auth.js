const jwt = require('jsonwebtoken');
const Forbidden = require('../errors/Forbidden');
const Unauthorized = require('../errors/Unauthorized');
const { JWT_SECRET } = require('../config/index');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Что-то не так, попробуйте снова'));
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // отправим ошибку, если не получилось
    return next(new Forbidden('Нет доступа'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
