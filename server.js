// load packages
require('dotenv').config({path:'.env'});
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
<<<<<<< HEAD
app.use(authRoutes);
app.use(eventRoutes);
app.use(bookingRoutes);
=======
 app.use(authRoutes);
 app.use(eventRoutes);
// app.use(bookingRoutes);
>>>>>>> 84954f37c934d7ce8ab8e06159e31c193f969c68

// get port number or default to 5000
const PORT = process.env.PORT || 5000;

// continously listen
app.listen(PORT, () => {
    console.log('Listening to port ' + PORT);
})