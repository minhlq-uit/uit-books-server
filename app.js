import express from "express";
import cors from "cors";
import books from "./routes/books.js";
import ErrorHandler from "./middleware/error.js";
import user from "./routes/user.js";
import order from "./routes/order.js";
import payment from "./routes/payment.js";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UIT BOOK API",
      version: "1.0.0",
      description: "All Apis For UIT BOOK Project",
    },
    // components: {
    //   securitySchemes: {
    //     jwt: {
    //       type: "http",
    //       scheme: "bearer",
    //       in: "header",
    //       bearerFormat: "JWT",
    //     },
    //   },
    // },
    // security: [
    //   {
    //     jwt: ["123"],
    //   },
    // ],
    // servers: [
    //   {
    //     url: '',
    //   },
    // ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);

const app = express();

const corsOptions = {
  origin: true,
  // origin:'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v2", books);
app.use("/api/v2", user);
app.use("/api/v2", order);
app.use("/api/v2", payment);
app.use("/", swaggerUI.serve, swaggerUI.setup(specs));
app.use(ErrorHandler);
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
