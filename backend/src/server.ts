import router from "./router";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = 8000;

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('db connection is open')
});

const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type', 'Accept']
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`)
});