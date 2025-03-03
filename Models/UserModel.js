const mongoose = require("mongoose");

// user schema
const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Standard User", "Organizer", "System Admin"],
        required: true
    }
})

// create the mongoose model
const User = mongoose.model("User", userSchema);

// export the model
module.exports = User;