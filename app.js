import express from "express";
import cors from "cors";
import authors from "./routes/authors.js";
import books from "./routes/books.js";
import ErrorHandler from "./middleware/error.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v2", books);
// app.use('/authors', authors);
app.use(ErrorHandler);
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
