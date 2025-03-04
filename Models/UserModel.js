const mongoose = require("mongoose");

// user schema
const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // the email must be unique for all users
    },
    role: {
        type: String,
        enum: ["Standard User", "Organizer", "System Admin"],
        required: true,
        default: "Standard User"
    },
    profilePicture: {
        type: String,
        required: false // pp is optional
    },
    password: {
        type: String,
        required: true,
        minLength: 8 // minimum length for password
    },
    timestamp: {
        type: Date,
        default: Date.now // initial date of creation
    }
})

// create the mongoose model
const User = mongoose.model("User", userSchema);

// export the model
module.exports = User;