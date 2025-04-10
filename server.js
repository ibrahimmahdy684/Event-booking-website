// load packages
require('dotenv').config();
const express = require('express');

// load files
const connectDB = require('./Config/dbConnect');
const userRoutes = require('./Routes/userRoutes');

connectDB();
const app = express();

// use middleware to parse JSON from requests
app.use(express.json());

// use User routes
app.use(userRoutes);

// get port number or default to 5000
const PORT = process.env.PORT || 5000;

// continously listen
app.listen(PORT, () => {
    console.log('Listening to port ' + PORT);
})