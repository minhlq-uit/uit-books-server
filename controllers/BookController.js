import catchAsyncErrors from "../middleware/catchAsynErrors.js";
import { Book } from "../models/Book.js";
import ErrorHandler from "../utils/ErrorHandler.js";

// create new book
export const createBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.create(req.body);

  res.status(201).json({
    success: true,
    book,
  });
});
// get all book
export const getAllBooks = catchAsyncErrors(async (req, res) => {
  //   const feature = new Features(Book.find(), req.query).search().filter();

  const books = await Book.find();
  console.log(books);
  res.status(200).json({
    success: true,
    books,
  });
});
// update book by id
export const updateBook = catchAsyncErrors(async (req, res, next) => {
  let book = await Book.findById(req.params.id);
  // console.log(first)
  if (!book) {
    return next(new ErrorHandler("Book is not found with this id", 404));
  }
  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    book,
  });
});
// delete book by id
export const deleteBook = catchAsyncErrors(async (req, res, next) => {
  let book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("book is not found with this id", 404));
  }
  await book.remove();

  res.status(200).json({
    success: true,
    message: "book deleted successfully",
  });
});
// get single book detail
export const getSingleBook = catchAsyncErrors(async (req, res, next) => {
  let book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("book is not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    book,
  });
});
