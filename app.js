// load packages
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

// load db and routes
const connectDB = require('./Config/dbConnect');
const userRoutes = require('./Routes/userRoutes');
const authRoutes = require('./Routes/authRoutes');
const eventRoutes = require('./Routes/eventRoutes');
const bookingRoutes = require('./Routes/bookingRoutes');

connectDB();
const app = express();

// use middleware to parse JSON from requests
app.use(express.json());
// use middleware to parse cookies from requests
app.use(cookieParser());

// use all routes
app.use(userRoutes);
app.use(authRoutes);
app.use(eventRoutes);
app.use(bookingRoutes);

module.exports = app;