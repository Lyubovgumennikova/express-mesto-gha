class Forbidden extends Error {
  constructor(message = 'Произошла ошибка') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = Forbidden;
