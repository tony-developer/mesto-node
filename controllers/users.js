const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({
      data: users,
    }))
    .catch(() => res.status(500).send({
      message: 'На сервере произошла ошибка',
    }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('Not valid id'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.message === 'Not valid id') {
        res.status(404).send({ message: 'Такого пользователя нет в базе' });
      } else {
        res.status(400).send({ message: 'Неверный запрос' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({
      data: user,
    }))
    .catch(() => res.status(400).send({
      message: 'Неверный запрос',
    }));
};
