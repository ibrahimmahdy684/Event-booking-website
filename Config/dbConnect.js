// load packages
require("dotenv").config();
const mongoose = require("mongoose");

// get datatbase url from .env file
const url = process.env.MONGO_URL;

// function to connect to the db (use in server.js)
const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected to db");
    } catch (err) {
        console.log(err);
    }
};

// export connect function
module.exports = connectDB;
