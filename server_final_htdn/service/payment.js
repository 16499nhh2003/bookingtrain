const TransactionModel = require('../models/transaction')
const bookingModel = require('../models/booking');
const userModel = require('../models/user');



// service cap nhat trang thai cua payment 
const updatePayment = ({ id }) => new Promise(async (resolve, reject) => {
    try {
        const trans = await TransactionModel.findByIdAndUpdate(id, {
            status: 'Đã hủy'
        }, { new: true })
        resolve(trans)
    } catch (error) {
        reject(error);
    }
});

const addPayment = ({ amount, status, transdate, booking, trantype, orderId }) => new Promise(async (resolve, reject) => {
    try {
        const pay = await TransactionModel.create({
            amount,
            status,
            transdate,
            trantype,
            booking,
            orderId
        })
        resolve(pay)
    } catch (error) {
        reject(error)
    }
})

module.exports = {
    updatePayment,
    addPayment
}