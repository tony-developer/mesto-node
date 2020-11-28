const express = require('express');
const path = require('path');
const userRouter = require('./routes/users.js');
const cardRouter = require('./routes/cards.js');
const userIdRouter = require('./routes/usersId.js');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('/users', userIdRouter);
app.use('/', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
});
