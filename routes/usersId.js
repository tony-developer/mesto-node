const userIdRouter = require('express').Router();
const fs = require('fs').promises;

userIdRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile('./data/users.json', 'utf-8')
    .then((data) => {
      const users = JSON.parse(data);
      try {
        const usersId = users.find((item) => item._id === req.params.id);
        if(!usersId) {
          res.status(404).json({ message: 'Нет пользователя с таким id' })
        }
        res.status(200).json(usersId);
      } catch {
      }
    })
});

module.exports = userIdRouter;
