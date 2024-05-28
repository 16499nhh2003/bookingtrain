const router = require('express').Router()
const promotionM = require('../models/promotion')
const companyM = require('../models/company')
const driverTripM = require('../models/driver_trip')

//service
const servicePromotion = require('../service/promotion')
// [post] promM
router.post('/', async (req, res, next) => {
    const
        { code,
            description,
            discountAmount,
            trips,
            company,
            startDate,
            endDate, } = req.body

    // console.log(new Date(startDate), new Date(endDate))
    try {
        const companyFind = await companyM.findOne({ phone: company })
        const prom = await promotionM.create({
            code,
            description,
            discountAmount,
            trips,
            company: companyFind._id,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        })
        let respsne = await servicePromotion.sendPromotion({ id: prom._id })
        return res.status(200).json(respsne)
    } catch (error) {
        next(error)
    }
})

// [get]  find list proM by company (phone )
router.get('/company/:phone', async (req, res, next) => {
    const phone = req.params.phone
    try {
        const comM = await companyM.findOne({ phone })
        const promotionMss = await promotionM.find({ company: comM._id })
            .populate({ path: 'trips', populate: { path: 'dropofflocation pickuplocation' } })
        res.status(200).json(promotionMss)

    } catch (error) {
        next(error)
    }
})


// kiem tra ma code and id  trip
router.get('/byCodeAndTripId/:code/:idtrip', async (req, res, next) => {
    const { code, idtrip } = req.params
    // console.log(code , idtrip)
    try {
        if (!code || !idtrip) {
            return res.status(400).json({ error: 'Both code and iddriverttrip are required' });
        }

        // Find the promotion based on the code
        const promotion = await promotionM.findOne({ code });
        if (!promotion) {
            return res.status(404).json({ error: 'Promotion not found' });
        }

        //
        // const drivertrip = await driverTripM.findById(iddriverttrip)

        // Check if the idtrip exists in the trips array of the promotion
        const tripExistsInPromotion = promotion.trips.some(tripId => tripId.equals(idtrip));
        if (!tripExistsInPromotion) {
            return res.status(404).json({ error: 'Trip not associated with this promotion' });
        }

        // Check if the promotion is valid based on the current date
        const currentDate = new Date();
        if (currentDate < promotion.startDate || currentDate > promotion.endDate) {
            return res.status(400).json({ error: 'Promotion is not valid at the current time' });
        }

        return res.status(200).json(promotion)
    } catch (error) {
        next(error)
    }
})
// router.get('/:idTrip', ctrls.getPickUpByTrip);
module.exports = router
