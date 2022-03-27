class ValidationError extends Error {
  constructor(message = 'Произошла ошибка') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = ValidationError;
