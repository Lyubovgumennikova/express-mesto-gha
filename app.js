const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mydb');
// , {
//   useNewUrlParser: true,
//   // useCreateIndex: true,
//   // useFindAndModify: false,
// });

app.use('/users', require('./routes/users'));

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6235188a2594b225bbf4ba33',
//   };

//   next();
// });

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
