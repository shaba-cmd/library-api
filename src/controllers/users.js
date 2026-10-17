const User = require('../models/user');

const ERROR_MESSAGE = 'Пользователь не найден';

const handleError = (err, res) => {
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join(', ');

    return res.status(400).send({ message });
  }

  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Некорректный id' });
  }

  if (err.code === 11000) {
    return res.status(409).send({ message: 'Такой username уже занят' });
  }

  return res.status(500).send({ message: 'Ошибка на стороне сервера' });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => handleError(err, res));
};

const getUser = (req, res) => {
  const { user_id } = req.params;

  User.findById(user_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: ERROR_MESSAGE });
      }

      return res.status(200).send(user);
    })
    .catch((err) => handleError(err, res));
};

const createUser = (req, res) => {
  const { name, lastName, username } = req.body;

  User.create({ name, lastName, username })
    .then((user) => res.status(201).send(user))
    .catch((err) => handleError(err, res));
};

const updateUser = (req, res) => {
  const { user_id } = req.params;
  const { name, lastName, username } = req.body;

  User.findByIdAndUpdate(
    user_id,
    { name, lastName, username },
    { new: true, runValidators: true, omitUndefined: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: ERROR_MESSAGE });
      }

      return res.status(200).send(user);
    })
    .catch((err) => handleError(err, res));
};

const deleteUser = (req, res) => {
  const { user_id } = req.params;

  User.findByIdAndDelete(user_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: ERROR_MESSAGE });
      }

      return res.status(200).send({ message: 'Пользователь удалён' });
    })
    .catch((err) => handleError(err, res));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};