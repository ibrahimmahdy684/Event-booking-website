const UserModel = require("../Models/UserModel");
const EventModel = require("../Models/eventModel");
const BookingModel = require("../Models/BookingModel");

const userController = {
    // get all users from db
    getAllUsers: async (req, res) => {
        try {
            // query all the users
            const users = await UserModel.find();
            res.status(200).json(users);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err.message });
        }
    },

    // get current user profile from db
    getCurrentUserProfile: async (req, res) => {
        try {
            // get current user (exclude password)
            const user = await UserModel.findOne({ _id: req.user.userId }).select(
                "-password"
            );

            // handle if user not found
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(user);
        } catch (err) {
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

            // find the user and update him
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                { $set: updates },
                { new: true, runValidators: true }
            ).select("-password");

            // handle user not found
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({
                message: "User updated",
                updatedUser,
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    //get current user's bookings
    getCurrentUserBookings: async (req, res) => {
        try {
            const bookings = await BookingModel.find({ user: req.user.id });
            res.status(200).json(bookings);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },

    // Get details of a single user
    getDetails: async(req,res) =>{
        try{
          const userId = req.params.id;
           const user = await UserModel.findById(userId);
           if (!user){
           return res.status(404).json({message : "user not found"})
           }
           res.status(200).json(user.select("-password"));
        }
        catch(error){
            console.log(error);
            res.status(500).json({message: error.message});

        }
    }, 


    //Update user’s role 
    updateRoles:  async(req,res) =>{
          try{
              const {email ,newRole}=req.body;
              const user = await UserModel.findOne({email});
              if (!user){
                return res.status(404).json({message : "user not found"})
                }
                user.role=newRole;
                user.save();
                res.status(200).json(user);

                

          }
          catch(error){
            console.log(error);
            res.status(500).json({message: error.message});
          }
    },

    // delete user
    deleteUser: async (req, res) => {
        try {
            const user = await UserModel.findByIdAndDelete(req.params.id);
            if (!user) return res.status(404).json({ msg: "User not found" });

            return res.status(200).json({ user, msg: "User deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    //Get current user’s events
    getCurrentUserEvents: async (req, res) => {
        try {
            const events = EventModel.find({ organizer: req.user.id });
            return res.status(200).json({ events });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    //Get the analytics of the current user’s events
    getUserEventAnalytics: async (req, res) => {
        try {
            const analytics = await Event.aggregate([
                { $match: { organizer: req.user.id } },
                {
                    $facet: {
                        totalEvents: [{ $count: "count" }],
                        eventsByStatus: [
                            {
                                $group: {
                                    _id: "$status",
                                    count: { $sum: 1 },
                                },
                            },
                        ],
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
                        eventsByCategory: [
                            {
                                $group: {
                                    _id: "$category",
                                    count: { $sum: 1 },
                                },
                            },
                        ],
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

            // Format response
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
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch event analytics" });
        }
    },
};

// export the controller
module.exports = userController;
