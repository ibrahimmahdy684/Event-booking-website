const User = require('../Models/UserModel');

// get all users from database
const getAllUsers = async (req, res) => {
    try {
        // query all the users
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(400).json({message: err.message});
    }
}

module.exports = {
    getAllUsers
}