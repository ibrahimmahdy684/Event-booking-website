const express = require('express');
const userController = require('../Controllers/userController');
const authorizeUser = require('../Middleware/authorizationMiddleware');

const router = express.Router();

// get all users route (Admin)
router.get('/api/v1/users', authorizeUser(['Admin']), userController.getAllUsers);

// export router
module.exports = router;