const router = require('express').Router()
const TransactionModel = require('../models/transaction');
const BookingModel = require('../models/booking');
const CompanyModel = require('../models/company');
const booking = require('../models/booking');
const drivertripModel = require('../models/driver_trip');
const tripModel = require('../models/trip');

// service
const serviceTrans = require('../service/payment')
const serviceUser = require('../service/user')

router.post('/', async (req, res, next) => {
    const { amount, status, trantype, booking } = req.body
    try {
        return res.status(200).json('ok')
    } catch (e) {
        next(e)
    }
})

router.get('/revenue/:phoneCompany', async (req, res, next) => {
    const { phoneCompany } = req.params
    const trangthaidonhang = 'Đã hủy'
    try {
        let payload = {}
        const company = await CompanyModel.findOne({ phone: phoneCompany })
        const idcompany = company._id
        let payments = await TransactionModel.find().populate({ path: 'booking', populate: { path: 'driverTrip', populate: 'trip' } });
        let paymentsfiler = payments
            .filter(element => element.booking.driverTrip.trip.idCompany.equals(idcompany) && element.status !== trangthaidonhang)

        console.log(payments)

        // toonrg tien
        let total = 0
        for (let item of payments) {
            total += item.amount
        }

        // so luong ve duoc dat
        let paymentsCount = paymentsfiler.length

        // so luong tuyen duong hoat dong
        let trips = await tripModel.find({ idCompany: idcompany })
        let idtrips = []
        trips.forEach(element => {
            idtrips.push(JSON.stringify(element._id))
        });

        // so luong chuyen xe
        let drivertrips = await drivertripModel.find()
        drivertrips = drivertrips.filter(item => {
            return idtrips.indexOf(JSON.stringify(item)) === -1
        })

        let staffs = await serviceUser.getAllSfatffAndDriverByCompany(phoneCompany)

        // response metadata
        payload = {
            payments: paymentsfiler,
            total,
            paymentsCount,
            tripCount: trips.length,
            drivertripCount: drivertrips.length,
            staffs
        }
        res.status(200).json(payload)
    } catch (error) {
        next(error)
    }
})

module.exports = router
