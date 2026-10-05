const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Имя обязательно'],
      minlength: [2, 'Имя не короче 2 символов'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Фамилия обязательна'],
      minlength: [2, 'Фамилия не короче 2 символов'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Username обязателен'],
      minlength: [5, 'Username не короче 5 символов'],
      unique: true,
      trim: true,
    },
    books: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }],
      default: [],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);