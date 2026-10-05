const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Заголовок обязателен'],
      minlength: [2, 'Заголовок не короче 2 символов'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Автор обязателен'],
      minlength: [2, 'Автор не короче 2 символов'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Год выпуска обязателен'],
      min: [1, 'Год должен быть положительным'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('book', bookSchema);