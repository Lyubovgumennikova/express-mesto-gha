const express = require('express');

// const path = require('path');
// const PUBLIC_FOLDER = path.join(__dirname, 'public');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const routerUser = require('./routes/users');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '6239aa037aac50a1def3734e', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  console.log(req.method, req.path);
  console.log(req.user._id);
  next();
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
});

// 6239aa037aac50a1def3734e
// app.use(express.static(PUBLIC_FOLDER));
// app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
