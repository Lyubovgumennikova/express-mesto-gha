const express = require('express');

const path = require('path');

const PUBLIC_FOLDER = path.join(__dirname, 'public');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const routerUser = require('./routes/users');
const {
  createUser,
  login,

} = require('./controllers/users');
const errorHandler = require('./middewares/errorHandler');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(PUBLIC_FOLDER));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  console.log(req.method, req.path);
  next();
});

app.post('/signin', login);
app.post('/signup', createUser);
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

// app.use((req, res) => {
//   res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
// });
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
