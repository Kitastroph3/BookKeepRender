// backend/controllers/bookController

const asyncHandler = require('express-async-handler');
const Book = require('../models/book');
const Note = require('../models/note');

// Get all saved books for a user
const showSavedBooks = asyncHandler(async (req, res) => {
    const books = await Book.find({ user: req.user.id });
    res.status(200).json(books);
});

// Save a book for a user
const saveBook = asyncHandler(async (req, res) => {
    const { title, author, key, coverImage, desc } = req.body;
    try {
        // Check if a book with the same key already exists for the user
        const existingBook = await Book.findOne({ key, user: req.user.id });
        if (existingBook) {
            console.log("Book already Saved")
            return res.status(400).json({ message: 'Book already exists in reading list' });
        }

        // Create a new book instance with the user ID
        const newBook = new Book({
            title,
            author,
            key,
            coverImage,
            desc,
            user: req.user.id
        });

        // Save the book to the database
        await newBook.save();

        res.status(201).json({ message: 'Book saved successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save book' });
    }
});

// Delete a saved book
const deleteSavedBook = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await Book.findByIdAndDelete(id);
        await Note.deleteMany({ book: id });
        res.status(200).json({ message: 'Book and notes deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete book' });
    }
});

module.exports = { saveBook, showSavedBooks, deleteSavedBook };