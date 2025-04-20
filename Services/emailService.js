require("dotenv").config();

// requring node mailer for sending otp mail in case forget password
const nodemailer = require("nodemailer");

//geting the service and getting the email and password of the app from the env file
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false, // does no care if the connection is secure
    },
});

module.exports = transporter;
