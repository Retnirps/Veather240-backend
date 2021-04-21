const dotenv = require('dotenv')
dotenv.config({path: __dirname + '/.env'});
const express = require('express');
const mongoose = require('mongoose');
const router = require('./js/router');

const PORT = process.env.PORT || 3000;

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

app.use(router);

const connect = async() => await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

connect().catch(e => console.error(e));

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});