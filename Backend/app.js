const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// load db and routes
const connectDB = require("./Config/dbConnect");
const userRoutes = require("./Routes/userRoutes");
const authRoutes = require("./Routes/authRoutes");
const eventRoutes = require("./Routes/eventRoutes");
const bookingRoutes = require("./Routes/bookingRoutes");

connectDB();
const app = express();

// use middleware to parse JSON from requests
app.use(express.json());
// use middleware to parse cookies from requests
app.use(cookieParser());
// use middleware to enable CORS
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);

// use all routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", eventRoutes);
app.use("/api/v1", bookingRoutes);

module.exports = app;
