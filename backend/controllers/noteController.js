const asyncHandler = require('express-async-handler');
const Note = require('../models/note');

// Get all notes for a specific book
const showNotesForBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const notes = await Note.find({ book: bookId });
  res.status(200).json(notes);
});

// Create a new note for a book
const createNote = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { bookId } = req.params;
  const { user } = req; // user from req
  const newNote = new Note({
    content: content,
    book: bookId,
    user: user._id 
  });
  const createdNote = await newNote.save();
  res.status(201).json(createdNote);
});

// Update a note
const updateNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params;
  const { content } = req.body;
  const updatedNote = await Note.findByIdAndUpdate(noteId, { content }, { new: true });
  res.status(200).json(updatedNote);
});

// Delete a note
const deleteNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params;
  await Note.findByIdAndDelete(noteId);
  res.status(200).json({ message: 'Note deleted successfully' });
});

module.exports = { showNotesForBook, createNote, updateNote, deleteNote };