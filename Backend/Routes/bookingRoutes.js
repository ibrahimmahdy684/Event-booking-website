const express = require("express");

// load middlewares and controller
const authorizeUser = require("../Middleware/authorizationMiddleware");
const authenticateUser = require("../Middleware/authenticationMiddleware");
const bookingController = require("../Controllers/bookingController");

const router = express.Router();

// Booking ticket for event for standard user
router.post(
    "/bookings",
    authenticateUser,
    authorizeUser(["Standard User"]),
    bookingController.bookTicketsForEvent
);

// Get booking by ID
router.get(
    "/bookings/:id",
    authenticateUser,
    authorizeUser(["Standard User"]), // Only Standard Users can access
    bookingController.getBookingDetails
);

// Cancel a booking
router.delete(
    "/bookings/:id",
    authenticateUser,
    authorizeUser(["Standard User"]), // Only Standard Users can access
    bookingController.deleteBooking
);

module.exports = router;
