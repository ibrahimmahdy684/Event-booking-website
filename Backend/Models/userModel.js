const mongoose = require("mongoose");

// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // the email must be unique for all users
    },
    profilePicture: {
        type: String, // for url or file path
        required: false, // pp is optional
    },
    password: {
        type: String,
        required: true,
        minLength: 8, // minimum length for password
    },
    role: {
        type: String,
        enum: ["Standard User", "Organizer", "System Admin"],
        required: true,
        default: "Standard User",
    },
    // adding for the user in case he forget the password and he need to be sent an otp
    otpCode: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    },
    timestamp: {
        // when the user was created
        type: Date,
        default: Date.now, // initial date of creation
    },
});

// create the mongoose model
const User = mongoose.models.User || mongoose.model("User", userSchema);

// export the model
module.exports = User;
