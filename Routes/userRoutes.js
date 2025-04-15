const express = require("express");

const userController = require("../Controllers/userController");

// load middlewares
const authorizeUser = require("../Middleware/authorizationMiddleware");
const authenticateUser = require("../Middleware/authenticationMiddleware");

const router = express.Router();

// get all users
router.get("/users", authenticateUser, authorizeUser(["System Admin"]), userController.getAllUsers);

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
    userController.updateCurrentUserProfile
);

// get current user's bookings
router.get(
    "/users/bookings",
    authenticateUser,
    authorizeUser(["Standard User"]),
    userController.getCurrentUserBookings
);

// Get details of a single user
router.get(
    "/users/:id",
    authenticateUser,
    authorizeUser(["System Admin"]),
    userController.getDetails
);


//Update user’s role 
router.put(
    "/users/:id",
    authenticateUser,
    authorizeUser(["System Admin"]),
    userController.updateRoles
);

// delete user
router.delete(
    "/users/:id",
    authenticateUser,
    authorizeUser(["System Admin"]),
    userController.deleteUser
);

//Get current user’s events
router.get(
    " /users/events",
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

// export router
module.exports = router;
