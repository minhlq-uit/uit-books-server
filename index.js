import app from "./server.js";
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDatabase from './db/Database.js';

// const app = express();
const PORT = process.env.port || 5000;
connectDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cors());


app.use('/', (req, res) => {
    res.send("SUCCESS");
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})