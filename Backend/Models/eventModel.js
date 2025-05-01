const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        // cover photo
        type: String, // represents url or file path
        required: true,
    },
    ticketPrice: {
        type: Number,
        required: true,
        min: 0, // no price is negative
    },
    totalTickets: {
        type: Number,
        required: true,
        min: 1, // event has to have atleast 1 ticket
    },
    remainingTickets: {
        type: Number,
        required: true,
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["Approved", "Pending", "Denied"],
        default: "Pending",
    },
    timestamp: {
        // indicates when the event was posted
        type: Date,
        default: Date.now, // Automatically set to the current date and time
    },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

module.exports = Event;
