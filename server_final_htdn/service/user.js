const userModel = require('../models/user')
const bookingModel = require('../models/booking')
const companyModel = require('../models/company');

const modifyPoint = ({ point, bookingid }) => new Promise(async (resolve, reject) => {
    try {
        const bookingData = await bookingModel.findById(bookingid)
        const userId = bookingData.user
        const user = await userModel.findById(userId)
        user.points = user.points ? +user.points + 1 : 1
        const res = await user.save()
        resolve(res)
    } catch (error) {
        reject(error);
    }
});

const getAllSfatffAndDriverByCompany = (phone) => new Promise(async (resolve, reject) => {
    try {
        const dataComapany = await companyModel.findOne({ phone: phone })
        const data = await userModel.find({ company: dataComapany._id })
        resolve(data)
    } catch (error) {
        reject(error)
    }
})

module.exports = {
    modifyPoint , 
    getAllSfatffAndDriverByCompany
}