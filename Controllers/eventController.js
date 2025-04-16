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
            return res.status(200).json(event);
        } catch (error) {
            console.log(err);
            res.status(500).json({ message: err.message });
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
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

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
