import express from 'express';
import { getAllAuthors, createAuthor, updateAuthor, deleteAuthor } from '../controllers/AuthorController.js';
const router = express.Router();

router.route('/authors')
    .get(getAllAuthors)

router.route('/author')
    .post(createAuthor)

router.route('/author/:id')
    .put(updateAuthor)
    .delete(deleteAuthor)

export default router;


