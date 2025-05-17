const express = require("express");

const authenticateUser = require("../Middleware/authenticationMiddleware");
const authController = require("../Controllers/authController");

const router = express.Router();

// route to check if user is authenticated
router.get("/check-auth", authenticateUser, (req, res) => {
    res.status(200).json({ user: req.user });
});

// route for register
router.post("/register", authController.registerUser);

// route for login
router.post("/login", authController.loginUser);

// route for forget password with sending otp to the user email
router.put("/forgetPassword", authController.forgetPassword);

//route for reseting the password after the user got the otp mail
router.put("/verifyReset", authController.verifyReset);

// route for logout
router.get("/logout", authController.logoutUser);

// export router
module.exports = router;
