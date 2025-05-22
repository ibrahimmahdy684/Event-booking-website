const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
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
        required: false,
    },
    image: {
        // cover photo
        type: String, // represents url or file path
        required: false,
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
        required: false,
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
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
