const express = require('express');
const router = express.Router();
const { saveBook, showSavedBooks, deleteSavedBook } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

// Route for saving a book to the reading list
router.post('/', protect, saveBook);

// Route for fetching all saved books for a user
router.get('/', protect, showSavedBooks);

// Route for deleting a book from the reading list
router.delete('/:id', protect, deleteSavedBook);  

module.exports = router;