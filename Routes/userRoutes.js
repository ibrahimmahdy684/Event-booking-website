const express = require('express');

const userController = require('../Controllers/userController');

// load middlewares
const authorizeUser = require('../Middleware/authorizationMiddleware');
const authenticateUser = require('../Middleware/authenticationMiddleware');

const router = express.Router();

// get all users
router.get(
    '/api/v1/users', 
    authenticateUser,
    authorizeUser(['Admin']), 
    userController.getAllUsers);

// get current user profile
router.get(
    '/api/v1/users/profile', 
    authenticateUser,
    authorizeUser(['Authenticated User']), 
    userController.getCurrentUserProfile);
//get current user's bookings
router.get(
    '/api/v1/users/bookings',
    authenticateUser,
    authorizeUser(['Standard User']),
    userController.getCurrentUserBookings
);
//delete user
router.delete(
    '/api/v1/users/:id',
    authenticateUser,
    authorizeUser(['Admin']),
    userController.deleteUser
);
//Get current user’s events
router.get(
    ' /api/v1/users/events',
    authenticateUser,
    authorizeUser(['EventOrganizer']),
    userController.getCurrentUserEvents
);
//Get the analytics of the current user’s events
router.get(
    '/api/v1/users/events/analytics',
    authenticateUser,
    authorizeUser(['EventOrganizer']),
    userController.getUserEventAnalytics
)
// export router
module.exports = router;