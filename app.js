const express = require('express');
const mongoose = require('mongoose');
// const routerUser = require('./routes/users');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use('/users', require('./routes/users'));

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
