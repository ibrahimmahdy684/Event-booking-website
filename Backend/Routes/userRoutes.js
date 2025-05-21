const express = require("express");
const multer = require("multer");

// load middlewares and controller
const authorizeUser = require("../Middleware/authorizationMiddleware");
const authenticateUser = require("../Middleware/authenticationMiddleware");
const userController = require("../Controllers/userController");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

// Specific Routes

// get current user’s events
router.get(
    "/users/events",
    authenticateUser,
    authorizeUser(["Organizer"]),
    userController.getCurrentUserEvents
);

//Get the analytics of the current user’s events
router.get(
    "/users/events/analytics",
    authenticateUser,
    authorizeUser(["Organizer"]),
    userController.getUserEventAnalytics
);

// General routes

// get all users
router.get(
    "/users",
    authenticateUser,
    authorizeUser(["System Admin"]),
    userController.getAllUsers
);

// get current user profile
router.get(
    "/users/profile",
    authenticateUser,
    authorizeUser(["Standard User", "System Admin", "Organizer"]),
    userController.getCurrentUserProfile
);

// update current user profile
router.put(
    "/users/profile",
    authenticateUser,
    authorizeUser(["Standard User", "System Admin", "Organizer"]),
    upload.single("profilePicture"), // for uploading profile picture
    userController.updateCurrentUserProfile
);

// get current user's bookings
router.get(
    "/users/bookings",
    authenticateUser,
    authorizeUser(["Standard User"]),
    userController.getCurrentUserBookings
);

// Dynamic routes

// get details of a single user
router.get(
    "/users/:id",
    authenticateUser,
    authorizeUser(["System Admin"]),
    userController.getUserDetails
);

// update user’s role
router.put(
    "/users/:id",
    authenticateUser,
    authorizeUser(["System Admin"]),
    userController.updateUserRole
);

// delete user
router.delete(
    "/users/:id",
    authenticateUser,
    authorizeUser(["System Admin"]),
    userController.deleteUser
);

// export router
module.exports = router;
