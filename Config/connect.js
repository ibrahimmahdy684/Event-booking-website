// load packages
require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGO_URL;

mongoose
    .connect(url)
    .then(() => {console.log("Connected to DB")})
    .catch((err) => {console.log(err)});

