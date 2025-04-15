const express = require("express");

const authController = require("../Controllers/authController");

const router = express.Router();

// route for register
router.post("/register", authController.registerUser);

// route for login
router.post("/login", authController.loginUser);

// route for forget password with sending otp to the user email
router.put("/forgetPassword", authController.forgetPassword);

//route for reseting the password after the user got the otp mail
router.put('/verifyReset', authController.verifyReset);

// export router
module.exports = router;
