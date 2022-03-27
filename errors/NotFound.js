class NotFound extends Error {
  constructor(message = 'Произошла ошибка') {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFound;
