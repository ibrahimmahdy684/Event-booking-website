// load packages
require('dotenv').config();
const express = require('express');
const app = express();

// use middleware to parse JSON from requests
app.use(express.json());

// get port number or default to 5000
const PORT = process.env.PORT || 5000;

// continously listen
app.listen(PORT, () => {
    console.log('Listening to port ' + PORT);
})