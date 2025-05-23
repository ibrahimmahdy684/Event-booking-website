const EventModel = require("../Models/eventModel");

const eventController = {
    createEvent: async (req, res) => {
        try {
            const {
                title,
                description,
                date,
                location,
                category,
                ticketPrice,
                totalTickets,
            } = req.body;

            // Get the filename from multer
            const image = req.file ? req.file.filename : undefined;

            const newEvent = new EventModel({
                title,
                description,
                date,
                location,
                category,
                image, // Save the filename here
                ticketPrice,
                totalTickets,
                remainingTickets: totalTickets,
                organizer: req.user.userId,
            });
            await newEvent.save();

            res.status(201).json(newEvent);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    getApprovedEvents: async (req, res) => {
        try {
            const approvedEvents = await EventModel.find({ status: "Approved" });
            return res.status(200).json(approvedEvents);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    getAllEvents: async (req, res) => {
        try {
            const events = await EventModel.find();
            return res.status(200).json(events);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    // get the event by the id
    getEvent: async (req, res) => {
        try {
            const event = await EventModel.findById(req.params.id);
            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }

            return res.status(200).json(event);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    //update the event by id
    updateEvent: async (req, res) => {
        try {
            // Build updateFields from req.body
            const updateFields = {
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                location: req.body.location,
                category: req.body.category,
                ticketPrice: req.body.ticketPrice,
                totalTickets: req.body.totalTickets,
                status: req.body.status,
            };

            // If a new image is uploaded, update it
            if (req.file) {
                updateFields.image = req.file.filename;
            }

            const event = await EventModel.findByIdAndUpdate(
                req.params.id,
                updateFields,
                { new: true }
            );

            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }

            return res.status(200).json(event);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    // delete an event from the db
    deleteEvent: async (req, res) => {
        try {
            const event = await EventModel.findByIdAndDelete(req.params.id);
            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }

            return res.status(200).json({ message: "Event deleted successfully", event });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },
};

module.exports = eventController; //exporting the event controller
