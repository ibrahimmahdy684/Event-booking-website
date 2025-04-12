const express = require('express');
const bookingController = require("../Controllers/bookingController");

// load middlewares
const authorizeUser = require('../Middleware/authorizationMiddleware');
const authenticateUser = require('../Middleware/authenticationMiddleware');

const router = express.Router();

// Booking ticket for event for standard user
router.post(
    '/api/v1/bookings',
    authenticateUser,
    authorizeUser(['Standard User']),
    bookingController.bookTicketsForEvent
)

// Get booking by ID 
router.get(
    '/api/v1/bookings/:id',
    authenticateUser,
    authorizeUser(['Standard User']), // Only Standard Users can access
    bookingController.getBookingDetails
)

// Cancel a booking
router.delete(
    '/api/v1/bookings/:id',
    authenticateUser,
    authorizeUser(['Standard User']), // Only Standard Users can access
    bookingController.deleteBooking

)

module.exports = router;
