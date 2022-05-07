import express from "express";
import cors from "cors";
import books from "./routes/books.js";
import ErrorHandler from "./middleware/error.js";
import user from "./routes/user.js";
import order from "./routes/order.js";

import cookieParser from "cookie-parser";
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v2", books);
app.use("/api/v2", user);
app.use("/api/v2", order);

app.use(ErrorHandler);
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
