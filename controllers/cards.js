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
  const { name, link, ownerId } = req.body;
  console.log(req.user._id);

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({
      data: card,
    }))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка ${err}`,
    }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({
      data: card,
    }))
    .catch((err) => res.status(500).send({
      message: `Произошла ошибка ${err}`,
    }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
  .orFail(new Error('Not valid cardId'))
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => {
    if (err.message === 'Not valid cardId') {
      res.status(404).send({ message: 'Такой карты нет в базе' });
    } else {
      res.status(500).send({ message: 'Ошибка при чтении файла' });
    }
  });
};

module.exports.deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id} },
    { new: true }
  )
  .orFail(new Error('Not valid cardId'))
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => {
    if (err.message === 'Not valid cardId') {
      res.status(404).send({ message: 'Такой карты нет в базе' });
    } else {
      res.status(500).send({ message: 'Ошибка при чтении файла' });
    }
  });
};
