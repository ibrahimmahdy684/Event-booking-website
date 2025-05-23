const express = require("express");
const multer = require("multer");

// load middlewares and controller
const authorizeUser = require("../Middleware/authorizationMiddleware");
const authenticateUser = require("../Middleware/authenticationMiddleware");
const eventController = require("../Controllers/eventController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Home page events (public)
router.get("/events/home", eventController.getHomeEvents);

// route for oragainzer to post events
router.post(
    "/events",
    authenticateUser,
    authorizeUser(["Organizer"]),
    upload.single("image"),
    eventController.createEvent
);

// route to get Approved events (public access)
router.get("/events", eventController.getApprovedEvents);

//route to get all the events
router.get(
    "/events/all",
    authenticateUser,
    authorizeUser(["System Admin"]),
    eventController.getAllEvents
);

//rote to get a single event (public access)
router.get("/events/:id", eventController.getEvent);

//route to update an event not for standard user
router.put(
    "/events/:id",
    authenticateUser,
    authorizeUser(["Organizer", "System Admin"]),
    upload.single("image"),
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
