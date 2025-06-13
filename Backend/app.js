const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./Config/dbConnect");
const userRoutes = require("./Routes/userRoutes");
const authRoutes = require("./Routes/authRoutes");
const eventRoutes = require("./Routes/eventRoutes");
const bookingRoutes = require("./Routes/bookingRoutes");
const path = require("path");

connectDB();
const app = express(); // ✅ Now it's defined

// use middleware to parse JSON from requests
app.use(express.json());
app.use(cookieParser());

// use middleware to enable CORS
const allowedOrigins = [
    "http://localhost:5173",
    "https://javascript-event-booking-1.onrender.com",
];

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// use all routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", eventRoutes);
app.use("/api/v1", bookingRoutes);

module.exports = app;
