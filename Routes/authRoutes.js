const express = require('express');

const authController = require('../Controllers/authController');

const router = express.Router();

// route for register
router.post('/api/v1/register', authController.registerUser);

// route for login
router.post('/api/v1/login', authController.loginUser);

// export router
module.exports = router