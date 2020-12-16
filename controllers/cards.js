const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({
      data: cards,
    }))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка ${err}`,
    }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({
      data: card,
    }))
    .catch(() => res.status(400).send({
      message: 'Неверный запрос',
    }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('Not valid Id'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'Not valid Id') {
        res.status(404).send({ message: 'Такого пользователя нет в базе' });
      } else {
        res.status(400).send({ message: 'Неверный запрос' });
      }
    });
};
