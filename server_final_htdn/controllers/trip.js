const Trip = require('../models/trip')
const Company = require('../models/company')
const Dropoff = require('../models/location_dropoff')
const Pickup = require('../models/location_pickup')

const asyncHandler = require('express-async-handler')
const slugify = require('slugify');
const { options } = require('../routes/trip');
const Station = require('../models/station');


// POST ONE TRIP
const createTrip = async (req, res, next) => {
    try {
        const {
            fromStation,
            toStation : toStation,
            startTime,
            price,
            companyPhoneNumber,
            dropOffTime
        } = req.body

        if (Object.keys(req.body).length === 0)
            next(new Error('Missing input'))

        const company = await Company.findOne({ phone: companyPhoneNumber })
        const dropofflocation = await Station.findById(toStation.value)
        const pickuplocation = await Station.findById(fromStation.value)

        if (!company || !dropOffTime || !pickuplocation)
            return res.status(400).json('Bad request')

        const newTrip = await Trip.create({
            dropofflocation: dropofflocation._id,
            pickuplocation: pickuplocation._id,
            pickUpTime: startTime,
            dropOffTime,
            price,
            idCompany: company._id,
        });

        const trip = await Trip.findById(newTrip._id).populate('dropofflocation pickuplocation')
        return res.status(200).json({
            success: true,
            newTrip: trip
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Cannot create new Trip' + error
        });
    }
};

const getTrip = asyncHandler(async (req, res) => {
    const { tId } = req.params
    const trip = await Trip.findOne({ _id: tId }).populate('dropofflocation pickuplocation idCompany')
    return res.status(200).json({
        success: trip ? true : false,
        tripData: trip ? trip : 'Cannot get Trip'
    })
})

const getAllTrip = asyncHandler(async (req, res) => {

    const { keyword } = req.query
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 5;
    // const skip = (page - 1) * limit;

    if (keyword) {
        let dropoffId = await Station.find({
            $or: [
                { nameProvince: { $regex: keyword, $options: 'i' } },
                { nameDistrict: { $regex: keyword, $options: 'i' } },
                { nameCommune: { $regex: keyword, $options: 'i' } }
            ]
        }).select("_id")

        // let pickupId = await Pickup.find({
        //     $or: [
        //         { nameProvince: { $regex: keyword, $options: 'i' } },
        //         { nameDistrict: { $regex: keyword, $options: 'i' } },
        //         { nameCommune: { $regex: keyword, $options: 'i' } }
        //     ]
        // }).select("_id")

        // let trips = await Trip.find({
        //     $or: [
        //         { dropofflocation: { $in: dropoffId } },
        //     ]
        // }).populate('dropofflocation pickuplocation')
        //     .skip(skip)
        //     .limit(limit);

        let trips = await Trip.find({}).populate('dropofflocation pickuplocation idCompany')

        let totalCount = await Trip.countDocuments({
            $or: [
                { dropofflocation: { $in: dropoffId } },
            ]
        });
        return res.status(200).json({
            status: true,
            // totalPages: Math.ceil(totalCount / limit),
            // currentPage: page,
            // totalTrips: totalCount,
            // limit: limit,
            // keyword,
            trips: trips
        })
    } else {
        let trips = await Trip.find({ statusActive: 'active' })
            .populate('dropofflocation pickuplocation idCompany')
        //     .skip(skip)
        //     .limit(limit);
        // let totalCount = await Trip.countDocuments({ statusActive: 'active' });
        return res.status(200).json({
            success: trips ? true : false,
            // totalPages: Math.ceil(totalCount / limit),
            // currentPage: page,
            // totalTrips: totalCount,
            // limit: limit,
            // keyword,
            trips: trips ? trips : 'Cannot get all Trip'
        })
    }
})

const updateTrip = asyncHandler(async (req, res) => {
    const { fromStation, toStation, startTime, price, companyPhoneNumber, dropOffTime } = req.body
    const { tId } = req.params

    const updatedTrip = await Trip.findByIdAndUpdate(tId, {
        dropofflocation: fromStation.value,
        pickuplocation: toStation.value,
        pickUpTime: startTime,
        dropOffTime,
        price,
        ...req.body
    }, { new: true }).populate('dropofflocation pickuplocation')

    return res.status(200).json({
        success: updatedTrip ? true : false,
        updatedTrip: updatedTrip ? updatedTrip : 'Cannot update Trip'
    })
})

const deleteTrip = asyncHandler(async (req, res) => {
    const { tId } = req.params
    const deletedTrip = await Trip.findByIdAndUpdate(tId, { statusActive: 'inactive' }, { lean: true });
    return res.status(200).json({
        success: deletedTrip ? true : false,
        deletedTrip: deletedTrip ? deletedTrip : 'Cannot delete Trip'
    });
});

const searchNameRoute = asyncHandler(async (req, res) => {
    const { keyword } = req.query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const dropoffId = await Dropoff.find({
        $or: [
            { nameProvince: { $regex: keyword, $options: 'i' } },
            { nameDistrict: { $regex: keyword, $options: 'i' } },
            { nameCommune: { $regex: keyword, $options: 'i' } }
        ]
    }).select("_id")

    const pickupId = await Pickup.find({
        $or: [
            { nameProvince: { $regex: keyword, $options: 'i' } },
            { nameDistrict: { $regex: keyword, $options: 'i' } },
            { nameCommune: { $regex: keyword, $options: 'i' } }
        ]
    }).select("_id")

    const trips = await Trip.find({
        $or: [
            { dropofflocation: { $in: dropoffId } },
            { pickuplocation: { $in: pickupId } }
        ]
    }).populate('dropofflocation pickuplocation')
        .skip(skip)
        .limit(limit);

    const totalCount = await Trip.countDocuments({
        $or: [
            { dropofflocation: { $in: dropoffId } },
            { pickuplocation: { $in: pickupId } }
        ]
    });


    return res.status(200).json({
        status: true,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        totalTrips: totalCount,
        trips: trips
    })

})

const get_Trip_bycompany = async (req, res, next) => {
    try {
        const { idCompany } = req.params
        const trips = await Trip.find({ idCompany })
        if (trips) {
            return res.status(200).json({
                status: true,
                data: trips
            })
        }
    } catch (error) {
        next(error)
    }
}

// GET list trip by phone company
const getListPHONECOMPANY = async (req, res, next) => {
    const { phone } = req.query
    try {
        const company = await Company.findOne({ phone })
        if (!company) {
            return res.status(400).json('Bad request')
        }
        const trips = await Trip.find({ idCompany: company._id }).populate('dropofflocation pickuplocation')
        return res.json(trips)

    } catch (e) {
        next(e)
    }
}

module.exports = {
    searchNameRoute,
    createTrip,
    getTrip,
    getAllTrip,
    updateTrip,
    deleteTrip,
    get_Trip_bycompany,
    getListPHONECOMPANY,
}