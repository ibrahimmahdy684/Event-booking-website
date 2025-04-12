require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../Models/UserModel');

const authController = {
    // function to register
    registerUser: async (req, res) => {
        try {   
            // get name, email, and password from body
            const { name, email, password, profilePicture, role } = req.body;

            // check if user is already registered before
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already registered before" });
            }

            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            // create new user with the given data and add to db 
            const newUser = await UserModel.create({ 
                name, 
                email, 
                password: hashedPassword,
                profilePicture: profilePicture || null,
                role
            });

            // return user to client
            res.status(201).json({ 
                message: "User created successfully", 
                newUser
            });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // function to login
    loginUser: async (req, res) => {
        try {
            // get email and password from request
            const { email, password } = req.body;

            // find user from db by email
            const user = await UserModel.findOne({ email });
            // check if user exists (user is registered or not)
            if (!user) {
                return res.status(404).json({ message: "Email is not found" });
            }

            // check if password is correct
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ password: "Incorrect password" });
            }

            // initialize cookie and token 

            const currenDateTime = new Date();
            // set the cookie to expire in 3 seconds (+currentDateTime converts to int)
            const expiresAt = new Date(+currenDateTime + 180000);
            
            // generate JWT token
            const token = jwt.sign(
                { user: {userId: user._id, role: user.role} },
                process.env.SECRET_KEY,
                {
                    expiresIn: 3 * 60 * 60, // set the token to expire in 3 hours
                }
            );

            // set the cookie
            return res
                .cookie("token", token, {
                    expires: expiresAt,
                    withCredentials: true,
                    httpOnly: false, // should be true in production
                    sameSite: 'none'
                })
                .status(200)
                .json({ message: "Login successfully", user });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // funtion to forget password
    forgetPassword: async (req, res) => {
        try {

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

// export controller
module.exports = authController;