const express = require('express');
const userController = require('../Controllers/userController');

const router = express.Router();

// get all users route
router.get('/api/v1/users', userController.getAllUsers);

// export router
module.exports = router;