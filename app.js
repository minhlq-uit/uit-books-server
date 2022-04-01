import express from 'express';
import cors from 'cors';
import authors from './routes/authors.js';
import books from './routes/books.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/books', books);
app.use('/authors', authors);
app.use('*', (req, res) => {
    res.status(404).json({error: "not found"})
});

export default app;
