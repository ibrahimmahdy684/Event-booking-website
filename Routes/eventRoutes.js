const express = require("express");

// load middlewares and controller
const authorizeUser = require("../Middleware/authorizationMiddleware");
const authenticateUser = require("../Middleware/authenticationMiddleware");
const eventController = require("../Controllers/eventController");

const router = express.Router();

// route for oragainzer to post events
router.post(
    "/events",
    authenticateUser,
    authorizeUser(["Organizer"]),
    eventController.createEvent
);

//route to get all the events and all the user have acess to it
router.get(
    "/events",
    authenticateUser,
    authorizeUser(["Organizer", "Standard User", "System Admin"]),
    eventController.getAllEvents
);

//rote to get a single event
router.get(
    "/events/:id",
    authenticateUser,
    authorizeUser(["Organizer", "Standard User", "System Admin"]),
    eventController.getEvent
);

//route to update an event not for standard user
router.put(
    "/events/:id",
    authenticateUser,
    authorizeUser(["Organizer", "System Admin"]),
    eventController.updateEvent
);

//route to delete event not available for standard user
router.delete(
    "/events/:id",
    authenticateUser,
    authorizeUser(["Organizer", "System Admin"]),
    eventController.deleteEvent
);
module.exports = router; //exporting the router
