const mongoose = require('mongoose');

// Define the Booking schema
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: true, // Booking must be associated with a user
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Reference to the Event collection
    required: true, // Booking must be associated with an event
  },
  numberOfTicketsBooked: {
    type: Number,
    required: true, // Number of tickets booked
    min: 1, // At least 1 ticket must be booked
  },
  totalPrice: {
    type: Number,
    required: true, // Total price of the booking
    min: 0, // Price cannot be negative
  },
  bookingStatus: {
    type: String,
    enum: ["pending", "confirmed", "canceled"], // Allowed statuses
    default: "pending", // Default status is "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
});

// Create the Booking model
const Booking = mongoose.model('Booking', bookingSchema, "Bookings");

module.exports = Booking;