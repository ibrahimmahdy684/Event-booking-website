const BookingModel = require("../Models/BookingModel");
const EventModel = require("../Models/eventModel");

const bookingController = {
    bookTicketsForEvent: async (req, res) => {
        try {
            const { eventId, numberOfTicketsBooked } = req.body;
            const userId = req.user.userId; // Extract authenticated user ID

            //check if event exist
            const event = await EventModel.findById(eventId);
            if (!event) {
                return res.status(404).json({ message: "event not found" });
            }

            // Check if there are enough tickets available
            if (event.remainingTickets < numberOfTicketsBooked) {
                return res.status(400).json({ message: "Not enough available tickets" });
            }

            // Calculate total price
            const totalPrice = event.ticketPrice * numberOfTicketsBooked;

            // create a booking
            const booking = new BookingModel({
                user: userId,
                event: eventId,
                numberOfTicketsBooked,
                totalPrice,
            });

            await booking.save();

            // Update Remaining Tickets
            event.remainingTickets -= numberOfTicketsBooked;
            await event.save();

            res.status(200).json({ message: "Booking successful!", booking });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    },

    getBookingDetails: async (req, res) => {
        try {
            // Find the booking by ID
            const booking = await BookingModel.findById(req.params.id);
            return res.status(200).json(booking);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    deleteBooking: async (req, res) => {
        try {
            const bookingId = req.params.id;

            // Find the booking
            const booking = await BookingModel.findById(bookingId);
            if (!booking) {
                return res.status(404).json({ message: "Booking not found." });
            }

            // Check if the booking belongs to the logged-in user
            if (!booking.user.equals(req.user.userId)) {
                return res
                    .status(403)
                    .json({ message: "You are not authorized to cancel this booking." });
            }

            // Fetch the associated event
            const event = await EventModel.findById(booking.event);
            if (!event) {
                return res.status(404).json({ message: "Associated event not found." });
            }

            // Increase the remaining tickets
            event.remainingTickets += booking.numberOfTicketsBooked;
            await event.save();

            // Delete the booking
            await BookingModel.findByIdAndDelete(bookingId);

            return res
                .status(200)
                .json({ message: "Booking canceled and tickets restored successfully." });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    },
};

module.exports = bookingController;
