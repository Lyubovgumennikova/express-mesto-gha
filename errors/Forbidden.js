class Forbidden extends Error {
  constructor(message = 'Нет прав') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = Forbidden;
