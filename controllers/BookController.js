import { BookModel } from '../models/Book.js';

export const getBooks = async (req, res, next) => {
    try {
        const books = await BookModel.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({error: err});
    }
};

export const createBook = async (req, res, next) => {
    try {
        const newBook = req.body;

        const book = new BookModel(newBook);
        await book.save();

        res.status(200).send('insert success');
    } catch (err) {
        res.status(500).json({error: err});
    }
};

export const updateBook = async (req, res, next) => {
    try {
        const updateBook = req.body;

        const book = await BookModel.findOneAndUpdate(
            { _id: updateBook._id },
            updateBook,
            { new: true }
        )

        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const deleteBook = req.body;

        const book = await BookModel.findOneAndDelete(
            { _id: deleteBook._id }
        )

        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
