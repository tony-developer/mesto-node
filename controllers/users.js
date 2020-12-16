const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({
      data: users,
    }))
    .catch((err) => res.status(500).send({
      message: `Ошибка при чтении файла ${err}`,
    }));
};

module.exports.getUserById = (req, res) => {
  // User.findById(req.params._id)
  User.findById(req.params.userId)
  // console.log(req.user._id)
    .orFail(new Error('Not valid id'))
    // .then((user) => res.status(200).send({ data: user }))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.message === 'Not valid id') {
        res.status(404).send({ message: 'Такого пользователя нет в базе' });
      } else {
        res.status(500).send({ message: 'Ошибка при чтении файла' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({
      data: user,
    }))
    .catch((err) => res.status(500).send({
      message: 'На сервере произошла ошибка',
    }));
};

module.exports.updateUserProfile = (req, res) => {
  User.findByIdAndUpdate(req.params.userId,
    { name: 'Новое имя' },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => res.send({
      data: user
    }))
  .catch((err) => res.status(500).send({
    message: 'На сервере произошла ошибка',
  }));
};

module.exports.updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.params.id, {})
  .then((user) => res.send({
    data: user
  }))
  .catch((err) => res.status(500).send({
    // message: 'На сервере произошла ошибка',
    err
  }));
};
