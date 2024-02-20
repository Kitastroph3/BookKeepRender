// backend/routes/noteRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { showNotesForBook, createNote, updateNote, deleteNote } = require('../controllers/noteController');

// Get all notes for a specific book
router.get('/:bookId/notes', protect, showNotesForBook);

// Create a new note for a book
router.post('/:bookId/notes', protect, createNote);

// Update a note
router.put('/:bookId/notes/:noteId', protect, updateNote);

// Delete a note
router.delete('/:bookId/notes/:noteId', protect, deleteNote);

module.exports = router;