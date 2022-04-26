import { Publisher } from "../models/Publisher.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

export const getAllPublishers = (req, res, next) => {
  Publisher.find()
    .then((publishers) => res.json(publishers))
    .catch(next);
};

export const createPublisher = catchAsyncErrors(async (req, res, next) => {
  const publisher = await Publisher.create(req.body);

  res.status(201).json({
    success: true,
    publisher,
  });
});

export const updatePublisher = catchAsyncErrors(async (req, res, next) => {
  let publisher = Publisher.findById(req.params.id);

  if (!publisher) {
    return next(new ErrorHandler("Publisher is not found with this id", 404));
  }
  publisher = await Publisher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    publisher,
  });
});

export const deletePublisher = catchAsyncErrors(async (req, res, next) => {
  let publisher = Publisher.findById(req.params.id);

  if (!publisher) {
    return next(new ErrorHandler("Publisher is not found with this id", 404));
  }

  await publisher.remove();

  res.status(200).json({
    success: true,
    message: "Publisher deleted successfully",
  });
});
