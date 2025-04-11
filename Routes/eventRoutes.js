const express = require('express');
const router = express.Router();
const EventController = require('../Controllers/eventController');
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

router.post('/api/v1/events',autherizationMiddleware(['Organizer']),EventController.createEvent);

router.get('/api/v1/events',
       autherizationMiddleware(['Organizer','Standard User','System Admin']),
       EventController.getAllEvents);

router.get('/api/v1/events/:id',
       autherizationMiddleware(['Organizer','Standard User','System Admin']),
       EventController.getEvent);

router.put('/api/v1/events/:id',
       autherizationMiddleware(['Organizer','System Admin']),
       EventController.updateEvent);

router.delete('/api/v1/events/:id',
       autherizationMiddleware(['Organizer','System Admin']),
       EventController.deleteEvent
)
module.exports=router