const express = require('express');
const router = express.Router();  // requring the router from express
const eventController = require('../Controllers/eventController'); 
const authorizeUser = require('../Middleware/authorizationMiddleware');
const authenticateUser = require('../Middleware/authenticationMiddleware');

// route for oragainzer to post events 
router.post('/api/v1/events',
       authenticateUser,
       authorizeUser(['Organizer']),
       eventController.createEvent);

//route to get all the events and all the user have acess to it
router.get('/api/v1/events',
       authenticateUser,
       authorizeUser(['Organizer','Standard User','System Admin']),
       eventController.getAllEvents);

//rote to get a single event
router.get('/api/v1/events/:id',
       authenticateUser,
       authorizeUser(['Organizer','Standard User','System Admin']),
       eventController.getEvent);

 //route to update an event not for standard user      
router.put('/api/v1/events/:id',
       authenticateUser,
       authorizeUser(['Organizer','System Admin']),
       eventController.updateEvent);

 //route to delete event not available for standard user      
router.delete('/api/v1/events/:id',
       authenticateUser,
       authorizeUser(['Organizer','System Admin']),
       eventController.deleteEvent
)
module.exports=router  //exporting the router