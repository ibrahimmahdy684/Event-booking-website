require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../Models/userModel");
const transporter = require("../Services/emailService");

const authController = {
    // function to register
    registerUser: async (req, res) => {
        try {
            // get name, email, and password from body
            const { name, email, password, profilePicture, role } = req.body;

            // check if user is already registered before
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: "User already registered before" });
            }

            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            // create new user with the given data and add to db
            const newUser = await UserModel.create({
                name,
                email,
                password: hashedPassword,
                profilePicture: profilePicture || null,
                role,
            });

            // return user to client
            res.status(201).json({
                message: "User created successfully",
                newUser,
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
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
            // should be 7 days in production (7 * 24 * 60 * 60 * 1000)
            const expiresAt = new Date(+currenDateTime + 180000);

            // generate JWT token
            const token = jwt.sign(
                { user: { userId: user._id, role: user.role } },
                process.env.SECRET_KEY,
                {
                    // should be 7 days in production (expiresIn: "7d",)
                    expiresIn: 3 * 60 * 60, // set the token to expire in 3 hours
                }
            );

            // set the cookie
            return res
                .cookie("token", token, {
                    expires: expiresAt,
                    withCredentials: true,
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                })
                .status(200)
                .json({ message: "Login successfully", user });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // forget password with the bonus of MFA by sending the otp to the mail of the user
    forgetPassword: async (req, res) => {
        const { email } = req.body; //getting the mail of the forgotten pass

        try {
            const user = await UserModel.findOne({ email });
            if (!user)
                //if the email does not exist return with error
                return res.status(404).json({ message: "User not found" });

            //creating random otp to send to the user
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            user.otpCode = otp;
            user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
            await user.save();

            //sending the mail
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: "Your OTP for Password Reset",
                text: `Your OTP code is: ${otp}\nIt expires in 5 minutes.`,
            });

            res.status(200).json({ message: "OTP sent to email" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    //function for the user to send the otp sent and the new password he want to use
    verifyReset: async (req, res) => {
        const { email, otp, newPassword } = req.body;

        try {
            const user = await UserModel.findOne({ email, otpCode: otp });

            //if the otp does not exist or expired
            if (!user || Date.now() > user.otpExpiry) {
                return res.status(400).json({ message: "Invalid or expired OTP" });
            }

            //hahsing the new password with 10 salt
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            user.otpCode = undefined;
            user.otpExpiry = undefined;

            await user.save(); //saving the uptaded user

            res.status(200).json({ message: "Password reset successful" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
};

// export controller
module.exports = authController;
