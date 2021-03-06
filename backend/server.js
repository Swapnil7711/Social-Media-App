import express from "express";
import { APP_PORT, DB_URL } from "./config/index.js"
import router from "./routes/index.js"
import errorHandler from "./middlewares/errorhandler.js";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import path from "path"
import cors from "cors"


global.APP_ROOT = path.resolve()

console.log(APP_ROOT)

const app = express();

// connect to mongo using coonection string
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// connect to database.
const db = mongoose.connection;
db.error("error", console.error.bind(console.error, "connection error"))
db.once("open", () => {
    console.log("connected to FB_DATA")
})

// for form data parsing
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", router)
app.get('/', (req, res) => { res.send(("hello from social app best")) })


// error handler middleware

app.use(errorHandler)
app.use('/api/uploads', express.static('uploads'));
const PORT = process.env.PORT || APP_PORT
app.listen(PORT, () => { console.log(`server running on port ${PORT}`) });
