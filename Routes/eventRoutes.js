const express = require('express');
const router = express.Router();
const EventController = require('../Controllers/eventController');
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

router.post('/api/v1/events', authenticateUser, authorizationMiddleware(['Organizer']),EventController.createEvent);

router.get('/api/v1/events',
       authenticateUser,
       authorizationMiddleware(['Organizer','Standard User','System Admin']),
       EventController.getAllEvents);

router.get('/api/v1/events/:id',
       authenticateUser,
       authorizationMiddleware(['Organizer','Standard User','System Admin']),
       EventController.getEvent);

router.put('/api/v1/events/:id',
       authenticateUser,
       authorizationMiddleware(['Organizer','System Admin']),
       EventController.updateEvent);

router.delete('/api/v1/events/:id',
       authenticateUser,
       authorizationMiddleware(['Organizer','System Admin']),
       EventController.deleteEvent
)
module.exports=router