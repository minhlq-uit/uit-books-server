import app from "./app.js";
import bodyParser from "body-parser";
import cors from "cors";
import connectDatabase from "./db/Database.js";

// const app = express();
const PORT = process.env.port || 5000;

//Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server for Handling uncaught Exception`);
});

connectDatabase();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/", (req, res) => {
  res.send("SUCCESS");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Shutting down server for ${err.message}`);
  console.log(`Shutting down the server due to Unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
