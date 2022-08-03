import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv'
import router from "./router/index.js"; // jika pake es6 syntax kalau di server harus ditambahkan .js nya
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: '30mb', extended: true})) // limit untuk upload image
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors());

app.use(router);
app.use(errorHandler);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 3009;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
    })
    .catch((err) => console.log(err))

// mongoose.set("useFindAndModify", false);
