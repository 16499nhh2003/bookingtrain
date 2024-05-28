const nodemailer = require('nodemailer');
const TransactionModel = require('../models/transaction')
const bookingModel = require('../models/booking');
const userModel = require('../models/user');
const promotionModel = require('../models/promotion');

const sendMail = ({ email, html, promotion }) => new Promise(async (resolve, reject) => {
    try {
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
            subject: "Hệ thống xin tặng bạn mã khuyến mãi", // Subject line
            text: `Mã khuyến mãi`, // plain text body
            html: html, // html body
        });
        resolve(info)
    } catch (error) {
        resolve(error)
    }
})


// send code promotion for user with condition (points > 1)
const sendPromotion = ({ id }) => new Promise(async (resolve, reject) => {
    try {
        const promotion = await promotionModel.findById(id)
        const users = await userModel.find({ role: 'user' })
        console.log(users)
        let emailPromises = []
        for (let user of users) {
            emailPromises.push(sendMail({
                email: user.email,
                html: `Mã khuyến mãi :  ${promotion.code} - 
                Giá tiền : ${promotion.discountAmount}-
                Ngày bắt đầu  : ${promotion.startDate}-
                Ngày kết thúc  :${promotion.endDate}`,
                promotion
            }))
        }
        await Promise.all(emailPromises)
        resolve({
            status: 200
        })
    } catch (error) {
        reject(error);
    }
})

module.exports = {
    sendPromotion,
}