const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users.js');
const cardRouter = require('./routes/cards.js');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5fd11735c5734005dc6c63f4',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('/', (req, res) => {
  res.status(500).json({
    message: 'На сервере произошла ошибка',
  });
});

app.listen(PORT, () => {});
