const EventModel = require("../Models/eventModel");

const eventController = {
    createEvent: async (req, res) => {
        const event = new EventModel({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            category: req.body.category,
            image: req.body.image,
            ticketPrice: req.body.ticketPrice,
            totalTickets: req.body.totalTickets,
            remainingTickets: req.body.remainingTickets,
            organizer: req.body.organizer,
            status: req.body.status,
            timestamp: req.body.timestamp,
        }); //creating events using the parameters in the body

        try {
            const newEvent = await event.save();
            res.status(201).json(newEvent);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    getAllEvents: async (req, res) => {
        try {
            const events = await EventModel.find();
            return res.status(200).json(events);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    // get the event by the id
    getEvent: async (req, res) => {
        try {
            const event = await EventModel.findById(req.params.id);
            return res.status(200).json(event);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    //uptade the event by id
    updateEvent: async (req, res) => {
        try {
            const event = await EventModel.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            return res.status(200).json(event);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    deleteEvent: async (req, res) => {
        try {
            const event = await EventModel.findByIdAndDelete(req.params.id);
            return res.status(200).json(event);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};

module.exports = eventController; //exporting the event controller
