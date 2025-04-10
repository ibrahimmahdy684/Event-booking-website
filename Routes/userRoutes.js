const express = require('express');
const userController = require('../Controllers/userController');
const authorizeUser = require('../Middleware/authorizationMiddleware');

const router = express.Router();

// get all users
router.get(
    '/api/v1/users', 
    //authorizeUser(['Admin']), 
    userController.getAllUsers);

// get current user profile
router.get(
    '/api/v1/users/profile', 
    //authorizeUser(['Authenticated User']), 
    userController.getCurrentUserProfile);

// export router
module.exports = router;