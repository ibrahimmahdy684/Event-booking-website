const EventModel = require("../Models/eventModel");

const eventController = {
    createEvent: async (req, res) => {
        try {
            // get details from body
            const {
                title,
                description,
                date,
                location,
                category,
                image,
                ticketPrice,
                totalTickets,
            } = req.body;

            // create new event and save it to db
            const newEvent = new EventModel({
                title,
                description,
                date,
                location,
                category,
                image,
                ticketPrice,
                totalTickets,
                remainingTickets: totalTickets,
                organizer: req.user.userId,
            });
            console.log(newEvent);
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
            // validate and filter the fields to update
            const updateFields = ({
                title,
                description,
                date,
                location,
                category,
                image,
                ticketPrice,
                totalTickets,
                remainingTickets,
                organizer,
                status,
            } = req.body);

            // find the event and update it
            const event = await EventModel.findByIdAndUpdate(
                req.params.id,
                updateFields,
                {
                    new: true,
                }
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
