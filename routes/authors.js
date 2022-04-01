import express from 'express';
import { getAuthors, createAuthor } from '../controllers/AuthorController.js';
const router = express.Router();

router.get('/', getAuthors);
// router.get('/create', AuthorController.create);

export default router;


