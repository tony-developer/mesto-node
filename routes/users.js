const userRouter = require('express').Router();
const fs = require('fs');

userRouter.get('/', (req, res) => {
  fs.readFile('./data/users.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(404).json({ message: 'Ошибка при чтении файла' });
      return;
    }
    const dataJson = JSON.parse(data);
    res.status(200).json(dataJson);
  });
});

module.exports = userRouter;
