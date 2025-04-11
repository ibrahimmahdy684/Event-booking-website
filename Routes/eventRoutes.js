const express = require('express');
const router = express.Router();
const EventController = require('../Controllers/eventController');
const authorizeUser = require('../Middleware/authorizationMiddleware');
const authenticateUser = require('../Middleware/authenticationMiddleware');

router.post('/api/v1/events',
       authenticateUser,
       authorizeUser(['Organizer']),
       EventController.createEvent);

router.get('/api/v1/events',
       authenticateUser,
       authorizeUser(['Organizer','Standard User','System Admin']),
       EventController.getAllEvents);

router.get('/api/v1/events/:id',
       authenticateUser,
       authorizeUser(['Organizer','Standard User','System Admin']),
       EventController.getEvent);

router.put('/api/v1/events/:id',
       authenticateUser,
       authorizeUser(['Organizer','System Admin']),
       EventController.updateEvent);

router.delete('/api/v1/events/:id',
       authenticateUser,
       authorizeUser(['Organizer','System Admin']),
       EventController.deleteEvent
)
module.exports=router