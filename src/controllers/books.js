const Book = require('../models/book');

const ERROR_MESSAGE = 'Книга не найдена';

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

  return res.status(500).send({ message: 'Ошибка на стороне сервера' });
};

const getBooks = (req, res) => {
  Book.find({})
    .then((books) => res.status(200).send(books))
    .catch((err) => handleError(err, res));
};

const getBook = (req, res) => {
  const { book_id } = req.params;

  Book.findById(book_id)
    .then((book) => {
      if (!book) {
        return res.status(404).send({ message: ERROR_MESSAGE });
      }

      return res.status(200).send(book);
    })
    .catch((err) => handleError(err, res));
};

const createBook = (req, res) => {
  const { title, author, year } = req.body;

  Book.create({ title, author, year })
    .then((book) => res.status(201).send(book))
    .catch((err) => handleError(err, res));
};

const updateBook = (req, res) => {
  const { book_id } = req.params;
  const { title, author, year } = req.body;

  Book.findByIdAndUpdate(
    book_id,
    { title, author, year },
    { new: true, runValidators: true, omitUndefined: true },
  )
    .then((book) => {
      if (!book) {
        return res.status(404).send({ message: ERROR_MESSAGE });
      }

      return res.status(200).send(book);
    })
    .catch((err) => handleError(err, res));
};

const deleteBook = (req, res) => {
  const { book_id } = req.params;

  Book.findByIdAndDelete(book_id)
    .then((book) => {
      if (!book) {
        return res.status(404).send({ message: ERROR_MESSAGE });
      }

      return res.status(200).send({ message: 'Книга удалена' });
    })
    .catch((err) => handleError(err, res));
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};