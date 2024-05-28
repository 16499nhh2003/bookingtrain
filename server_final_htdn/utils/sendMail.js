const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler(async ({email, html}) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, //true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: '"Xe khách " <no-relply@coach.com>', // sender address
        to: email, // list of receivers
        subject: "Send mail", // Subject line
        text: "Hello world?", // plain text body
        html: html, // html body
    });

    return info
})

module.exports = sendMail