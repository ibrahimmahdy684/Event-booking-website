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
                remainingTickets,
                organizer,
                status,
                timestamp,
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
                remainingTickets,
                organizer,
                status,
                timestamp,
            });
            await newEvent.save();

            res.status(201).json(newEvent);
        } catch (error) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    getAllEvents: async (req, res) => {
        try {
            const events = await EventModel.find();
            return res.status(200).json(events);
        } catch (error) {
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
        } catch (error) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    //update the event by id
    updateEvent: async (req, res) => {
        try {
            // find the event and update it
            const event = await EventModel.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });

            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }

            return res.status(200).json(event);
        } catch (error) {
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

            return res.status(200).json(event);
        } catch (error) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },
};

module.exports = eventController; //exporting the event controller
