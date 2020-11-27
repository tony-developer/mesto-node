const cardRouter = require('express').Router();
const fs = require('fs').promises;

cardRouter.get('/', (req, res) => {
  fs.readFile('./data/cards.json', 'utf-8')
    .then((data) => {
      const dataJson = JSON.parse(data);
      res.status(200).json(dataJson);
    })
    .catch(() => {
      res.status(404).json({ message: 'Ошибка при чтении файла' });
    });
});

module.exports = cardRouter;
