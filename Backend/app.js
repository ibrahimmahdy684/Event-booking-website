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
const allowedOrigins = [
    "http://localhost:5173", // for local dev
    "https://java-script-event-booking.vercel.app/", // deployed frontend
];

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // this is key for cookies/session tokens
    })
);
// to serve the uploads folder statically
app.use("/uploads", express.static("uploads"));

// use all routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", eventRoutes);
app.use("/api/v1", bookingRoutes);

module.exports = app;
