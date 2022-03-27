const errorHandler = (err, req, res, next) => {
  console.log(err.stask || err);
  const status = err.statusCode || 500;
  res.status(status).send({
    message: 'На сервере произошла ошибка',
    err,
  });
  next();
};

module.exports = errorHandler;
