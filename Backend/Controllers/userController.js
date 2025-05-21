const UserModel = require("../Models/userModel");
const EventModel = require("../Models/eventModel");
const BookingModel = require("../Models/bookingModel");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const userController = {
    // get all users from db
    getAllUsers: async (req, res) => {
        try {
            // query all the users
            const users = await UserModel.find().select("-password -otpCode -otpExpiry");
            res.status(200).json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    // get current user profile from db
    getCurrentUserProfile: async (req, res) => {
        try {
            // get current user (exclude password)
            const user = await UserModel.findOne({ _id: req.user.userId }).select(
                "-password -otpCode -otpExpiry"
            );

            // handle if user not found
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    // update current user profile
    updateCurrentUserProfile: async (req, res) => {
        try {
            const userId = req.user.userId;
            const updates = req.body;

            // state the allowed fields to be updated
            const allowedUpdates = ["name", "email", "profilePicture"];
            // get the updated fileds
            const updateFields = Object.keys(updates);

            // check if the update fields are allowed
            const isValidUpdate = updateFields.every((field) =>
                allowedUpdates.includes(field)
            );
            if (!isValidUpdate) {
                return res.status(400).json({ message: "Invalid input fields" });
            }

            // Find the user first (needed for file removal)
            const user = await UserModel.findById(userId);

            // Remove profile picture if requested
            if (req.body.removeProfilePicture === "true" && user && user.profilePicture) {
                const filePath = path.join(
                    __dirname,
                    "../../uploads",
                    user.profilePicture
                );
                // Remove file from disk if exists
                fs.unlink(filePath, (err) => {
                    // Ignore error if file doesn't exist
                });
                updates.profilePicture = null;
            }

            // save profile picture path if exists
            if (req.file) {
                updates.profilePicture = req.file.filename;
            }

            // check if the user's new email is already registered
            if (updateFields.includes("email")) {
                const existingUser = await UserModel.findOne({
                    email: updates.email,
                });
                if (existingUser && existingUser._id.toString() !== userId) {
                    return res.status(400).json({
                        message: "Email already registered",
                    });
                }
            }

            // find the user and update him
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                { $set: updates },
                { new: true, runValidators: true }
            ).select("-password -otpCode -otpExpiry");

            // handle user not found
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({
                message: "User updated",
                user: updatedUser,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    //get current user's bookings
    getCurrentUserBookings: async (req, res) => {
        try {
            const bookings = await BookingModel.find({ user: req.user.userId });
            res.status(200).json(bookings);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    // Get details of a single user
    getUserDetails: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await UserModel.findById(userId).select(
                "-password -otpCode -otpExpiry"
            );
            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }
            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    //Update user’s role
    updateUserRole: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await UserModel.findById(userId).select(
                "-password -otpCode -otpExpiry"
            );
            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }

            const { newRole } = req.body;

            // update role and save to db
            user.role = newRole;
            await user.save();

            res.status(200).json({ message: "user updated successfully", user });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    // delete user
    deleteUser: async (req, res) => {
        try {
            const user = await UserModel.findByIdAndDelete(req.params.id);
            if (!user) return res.status(404).json({ msg: "User not found" });

            return res.status(200).json({ user, msg: "User deleted successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    //Get current user’s events
    getCurrentUserEvents: async (req, res) => {
        try {
            const events = await EventModel.find({ organizer: req.user.userId });
            return res.status(200).json({ events });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    //Get the analytics of the current user’s events
    getUserEventAnalytics: async (req, res) => {
        try {
            console.log(req.user.userId);
            // Aggregate analytics for events organized by the current user
            const analytics = await EventModel.aggregate([
                // Match events by the current user's ID
                { $match: { organizer: new mongoose.Types.ObjectId(req.user.userId) } },
                {
                    $facet: {
                        // Count the total number of events
                        totalEvents: [{ $count: "count" }],

                        // Group events by their status (e.g., active, canceled)
                        eventsByStatus: [
                            {
                                $group: {
                                    _id: "$status",
                                    count: { $sum: 1 },
                                },
                            },
                        ],

                        // Calculate tickets sold and revenue for each event
                        ticketsSoldAndRevenue: [
                            {
                                $project: {
                                    soldTickets: {
                                        $subtract: ["$totalTickets", "$remainingTickets"],
                                    },
                                    revenue: {
                                        $multiply: [
                                            {
                                                $subtract: [
                                                    "$totalTickets",
                                                    "$remainingTickets",
                                                ],
                                            },
                                            "$ticketPrice",
                                        ],
                                    },
                                },
                            },
                            {
                                $group: {
                                    _id: null,
                                    totalTicketsSold: { $sum: "$soldTickets" },
                                    totalRevenue: { $sum: "$revenue" },
                                },
                            },
                        ],

                        // Group events by their category
                        eventsByCategory: [
                            {
                                $group: {
                                    _id: "$category",
                                    count: { $sum: 1 },
                                },
                            },
                        ],

                        // Categorize events as upcoming or past based on their date
                        upcomingVsPastEvents: [
                            {
                                $group: {
                                    _id: {
                                        $cond: [
                                            { $gte: ["$date", new Date()] },
                                            "Upcoming",
                                            "Past",
                                        ],
                                    },
                                    count: { $sum: 1 },
                                },
                            },
                        ],
                    },
                },
            ]);

            // Format the aggregated analytics into a structured response
            const result = {
                totalEvents: analytics[0].totalEvents[0]?.count || 0,
                eventsByStatus: analytics[0].eventsByStatus,
                ticketsSoldAndRevenue: analytics[0].ticketsSoldAndRevenue[0] || {
                    totalTicketsSold: 0,
                    totalRevenue: 0,
                },
                eventsByCategory: analytics[0].eventsByCategory,
                upcomingVsPastEvents: analytics[0].upcomingVsPastEvents,
            };

            res.status(200).json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },
};

// export the controller
module.exports = userController;
