import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
} from "../controllers/BookController.js";
const router = express.Router();

router.route("/book/new").post(createBook);
router.route("/books").get(getAllBooks);
router.route("/book/:id").put(updateBook).get(getSingleBook).delete(deleteBook);
export default router;
