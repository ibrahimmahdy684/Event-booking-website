const User = require('../Models/UserModel');

// get all users from db
const getAllUsers = async (req, res) => {
    try {
        // query all the users
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(400).json( { message: err.message } );
    }
}

// get current user profile from db
const getCurrentUserProfile = async (req, res) => {
    try {
        
    } catch (err) {
        res.status(404).json({ message: err.message} );
    }
}

module.exports = {
    getAllUsers,
    getCurrentUserProfile
}