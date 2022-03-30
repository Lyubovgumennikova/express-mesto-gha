const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PUBLIC_FOLDER = path.join(__dirname, 'public');
// const routerUser = require('./routes/users');
// const { errors } = require('celebrate');
// const { celebrate, Joi, Segments } = require('celebrate');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const validations = require('./middlewares/validations');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(PUBLIC_FOLDER));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/signup', validations.register, createUser);
app.post('/signin', validations.register, login);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/cards'));

// app.use((req, res) => {
//   res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
// });
// app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
