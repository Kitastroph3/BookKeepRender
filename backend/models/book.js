const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
  },
  key: {
    type: String,
    required: true
  },
  desc: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true
  }
},
    {
        timestamps: true
    }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;