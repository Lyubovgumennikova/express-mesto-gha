class Unauthorized extends Error {
  constructor(message = 'Произошла ошибка') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = Unauthorized;
