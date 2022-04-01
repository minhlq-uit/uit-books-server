import express from 'express';
import { getBooks, createBook, updateBook, deleteBook } from '../controllers/BookController.js';
const router = express.Router();

router.get('/', getBooks);
router.post('/', createBook);
router.put('/', updateBook);
router.delete('/', deleteBook);

export default router;


