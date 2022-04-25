import { Author } from "../models/Author.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

export const getAllAuthors = (req, res, next) => {
  Author.find()
    .then((authors) => res.json(authors))
    .catch(next);
};

export const createAuthor = catchAsyncErrors(async (req, res, next) => {
  const author = await Author.create(req.body);

  res.status(201).json({
    success: true,
    author,
  });
});

export const updateAuthor = catchAsyncErrors(async (req, res, next) => {
  let author = Author.findById(req.params.id);

  if (!author) {
    return next(new ErrorHandler("Author is not found with this id", 404));
  }
  author = await Author.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    author,
  });
});

export const deleteAuthor = catchAsyncErrors(async (req, res, next) => {
  let author = Author.findById(req.params.id);

  if (!author) {
    return next(new ErrorHandler("Author is not found with this id", 404));
  }

  await author.remove();

  res.status(200).json({
    success: true,
    message: "author deleted successfully",
  });
});
