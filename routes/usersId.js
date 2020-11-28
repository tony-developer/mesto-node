const userIdRouter = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

userIdRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(path.join(__dirname, '..', 'data', 'users.json'), 'utf-8')
    .then((data) => {
      const users = JSON.parse(data);
      // eslint-disable-next-line no-underscore-dangle
      const usersId = users.find((item) => item._id === id);
      if (!usersId) {
        res.status(404).json({ message: 'Нет пользователя с таким id' });
      }
      res.status(200).json(usersId);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка при чтении файла' });
    });
});

module.exports = userIdRouter;
