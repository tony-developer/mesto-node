const cardRouter = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

cardRouter.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data', 'cards.json'), 'utf-8')
    .then((data) => {
      const dataJson = JSON.parse(data);
      res.status(200).json(dataJson);
    })
    .catch(() => {
      res.status(500).json({ message: 'Ошибка при чтении файла' });
    });
});

module.exports = cardRouter;
