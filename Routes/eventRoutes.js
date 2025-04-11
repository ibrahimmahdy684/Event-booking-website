const express = require('express');
const router = express.Router();
const EventController = require('../Controllers/eventController');
const authorizeUser = require('../Middleware/authorizationMiddleware');
const authenticateUser = require('../Middleware/authenticationMiddleware');

<<<<<<< HEAD
router.post('/api/v1/events', authenticateUser, authorizationMiddleware(['Organizer']),EventController.createEvent);

router.get('/api/v1/events',
       authenticateUser,
       authorizationMiddleware(['Organizer','Standard User','System Admin']),
=======
router.post('/api/v1/events',
       authenticateUser,
       authorizeUser(['Organizer']),
       EventController.createEvent);

router.get('/api/v1/events',
       authenticateUser,
       authorizeUser(['Organizer','Standard User','System Admin']),
>>>>>>> 84954f37c934d7ce8ab8e06159e31c193f969c68
       EventController.getAllEvents);

router.get('/api/v1/events/:id',
       authenticateUser,
<<<<<<< HEAD
       authorizationMiddleware(['Organizer','Standard User','System Admin']),
=======
       authorizeUser(['Organizer','Standard User','System Admin']),
>>>>>>> 84954f37c934d7ce8ab8e06159e31c193f969c68
       EventController.getEvent);

router.put('/api/v1/events/:id',
       authenticateUser,
<<<<<<< HEAD
       authorizationMiddleware(['Organizer','System Admin']),
=======
       authorizeUser(['Organizer','System Admin']),
>>>>>>> 84954f37c934d7ce8ab8e06159e31c193f969c68
       EventController.updateEvent);

router.delete('/api/v1/events/:id',
       authenticateUser,
<<<<<<< HEAD
       authorizationMiddleware(['Organizer','System Admin']),
=======
       authorizeUser(['Organizer','System Admin']),
>>>>>>> 84954f37c934d7ce8ab8e06159e31c193f969c68
       EventController.deleteEvent
)
module.exports=router