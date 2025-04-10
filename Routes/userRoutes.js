const express = require('express');

const userController = require('../Controllers/userController');

// load middlewares
const authorizeUser = require('../Middleware/authorizationMiddleware');
const authenticateUser = require('../Middleware/authenticationMiddleware');

const router = express.Router();

// get all users
router.get(
    '/api/v1/users', 
    //authenticateUser,
    //authorizeUser(['Admin']), 
    userController.getAllUsers);

// get current user profile
router.get(
    '/api/v1/users/profile', 
    //authenticateUser,
    //authorizeUser(['Authenticated User']), 
    userController.getCurrentUserProfile);

// export router
module.exports = router;