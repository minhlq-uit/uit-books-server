import { AuthorModel } from '../models/Author.js';

export const getAuthors = (req, res, next) => {
    AuthorModel.find()
        .then(authors => res.json(authors))
        .catch(next)
};

export const createAuthor = (req, res, next) => {
    res.send('create author')
};
