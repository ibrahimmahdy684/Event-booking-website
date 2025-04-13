const express = require("express");

const authController = require("../Controllers/authController");

const router = express.Router();

// route for register
router.post("/register", authController.registerUser);

// route for login
router.post("/login", authController.loginUser);

// route for forget password
router.put("/forgetPassword", authController.forgetPassword);

// export router
module.exports = router;
