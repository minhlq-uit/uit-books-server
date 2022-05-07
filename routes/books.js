import express from "express";
import {
  createBook,
  createBookReview,
  deleteBook,
  deleteReview,
  getAllBooks,
  getNewBooks,
  getPopularBooks,
  getSingleBook,
  getSingleBookReviews,
  updateBook,
} from "../controllers/BookController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();

router.route("/book/new").post(createBook);

router.route("/books/new").get(getNewBooks)
router.route("/books/popular").get(getPopularBooks)
router.route("/books").get(getAllBooks);
router.route("/book/:id").put(updateBook).get(getSingleBook).delete(deleteBook);
router.route("/book/review").post(isAuthenticatedUser, createBookReview);
router
  .route("/reviews")
  .get(getSingleBookReviews)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);
export default router;
