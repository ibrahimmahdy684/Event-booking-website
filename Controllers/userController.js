const UserModel = require('../Models/UserModel');

// get all users from db
const getAllUsers = async (req, res) => {
    try {
        // query all the users
        const users = await UserModel.find();
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
//get current user's bookings
const getCurrentUserBookings = async (req,res)=>{
    try{
        const bookings=await BookingModel.find({user:req.user})
         res.status(200).json(bookings)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error.message})
    }
}
//delete user
const deleteUser = async (req,res)=>{
try{
    const user=UserModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({user,msg:"User deleted successfully"});
}
catch(error){
    return res.status(500).json({message:error.message});
}
}
module.exports = {
    getAllUsers,
    getCurrentUserProfile,
    getCurrentUserBookings,
    deleteUser
}