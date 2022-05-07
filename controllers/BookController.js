import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { Book } from "../models/Book.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ApiFeatures from "../utils/ApiFeatures.js";

// create new book
export const createBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.create(req.body);

  res.status(201).json({
    success: true,
    book,
  });
});
// get all books
export const getAllBooks = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 4;

  const booksCount = await Book.countDocuments();

  const apiFeature = new ApiFeatures(Book.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const books = await apiFeature.query;

  res.status(200).json({
    success: true,
    books,
    booksCount,
    resultPerPage,
  });
});

// get new books
export const getNewBooks = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 4;
  const apiFeature = new ApiFeatures(Book.find().sort({ createAt: -1 }), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const books = await apiFeature.query;
  res.status(200).json({
    success: true,
    books,
    resultPerPage,
  });
});

// get popular books
export const getPopularBooks = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 4;
  const apiFeature = new ApiFeatures(Book.find().sort({ Sold: -1 }), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const books = await apiFeature.query;
  res.status(200).json({
    success: true,
    books,
    resultPerPage,
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

// Create review and update review
export const createBookReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, bookId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const book = await Book.findById(bookId);

  const isReviewed = book.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    book.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    book.reviews.push(review);
    book.numOfReviews = book.reviews.length;
  }

  let avg = 0;

  book.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  book.ratings = avg / book.reviews.length;

  await book.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get all reviews of a single book

export const getSingleBookReviews = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.query.id);

  if (!book) {
    return next(new ErrorHandler("book is not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    reviews: book.reviews,
  });
});
// Delete Review --Admin
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.query.bookId);

  if (!book) {
    return next(new ErrorHandler("book not found with this id", 404));
  }

  const reviews = book.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Book.findByIdAndUpdate(
    req.query.bookId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
