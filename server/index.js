import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';

import connectDb from "./mongodb/connect.js";

import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();

var corsOptions = {
    origin: "http://localhost:5173",
    secure: false,
}

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.use(express.json(({ limit: '50mb' })));

app.get('/', async (req, res) => {
    res.send("Hello from DALL-E");
});

const startServer = async () => {
    try {
        connectDb(process.env.MONGODB_URL);
        app.listen(8080, () => {
            console.log("Server running on port http://localhost:8080");
        })
    }
    catch (err) {
        console.log(err);
    }
}

startServer();