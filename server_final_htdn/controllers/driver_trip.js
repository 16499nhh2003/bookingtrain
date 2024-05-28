const DriverTrip = require('../models/driver_trip')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');
const Company = require('../models/company');
const User = require('../models/user');
const Trip = require('../models/trip');
const Car = require('../models/car');
const Userdrivertrip = require('../models/userdrivertrip');
const PickUpModel = require('../models/location_pickup');
const Stations = require('../models/station');
const { createDate } = require('../utils/utils')

const createDriverTrip = async (req, res, next) => {
    const { idtrip, idcar, drivers, date } = req.body
    try {
        if (Object.keys(req.body).length === 0) throw new Error('Missing input');
        const phoneDriver = drivers.split('-')
        let driversList = []
        for (let phone in phoneDriver) {
            let driver = await User.findOne({ mobile: phoneDriver[phone], role: 'driver' })
            if (!driver) {
                return res.status(404).json({
                    status: false, msg: 'Driver not found'
                })
            }
            driversList.push(driver)
        }
        driversList = driversList.map((driver) => driver._id)

        const car = await Car.findById(idcar)
        const newDriverTrip = await DriverTrip.create({
            ...req.body, trip: idtrip, car: idcar, date: new Date(date), seats: car.seats
        });


        let userdrivertripIds = []
        for (let i in driversList) {
            const userdrivertrip = await Userdrivertrip.create({
                user: driversList[i], driverTrip: newDriverTrip._id, status: true, date: createDate(date)
            })
            if (userdrivertrip)
                // [...userdrivertripIds, userdrivertrip._id]
                userdrivertripIds.push(userdrivertrip._id)
        }
        newDriverTrip.userDriverTrips = userdrivertripIds
        await newDriverTrip.save()

        if (newDriverTrip) return res.status(200).json({
            success: true, data: newDriverTrip
        });
        next()
    } catch (error) {
        next(error)
    }
};

const getDriverTrip = asyncHandler(async (req, res) => {
    const { dtId } = req.params
    const driverTrip = await DriverTrip.findOne({ _id: dtId })
    return res.status(200).json({
        success: driverTrip ? true : false, driverTripData: driverTrip ? driverTrip : 'Cannot get DriverTrip'
    })
})

const getAllDriverTrip = asyncHandler(async (req, res) => {
    const driverTrip = await DriverTrip.find();
    return res.status(200).json({
        success: driverTrip ? true : false, driverTrips: driverTrip ? driverTrip : 'Cannot get all DriverTrip'
    })
})

const updateDriverTrip = async (req, res, next) => {
    const { id } = req.params
    const { drivers } = req.body

    try {
        const phoneDriver = drivers.split('-')
        let driversList = []
        for (let phone in phoneDriver) {
            let driver = await User.findOne({ mobile: phoneDriver[phone], role: 'driver' })
            if (!driver) {
                return res.status(404).json({
                    status: false, msg: 'Driver not found'
                })
            }
            driversList.push(driver)
        }
        driversList = driversList.map((driver) => driver._id)
        let userDriverTrips = driversList.map(item => {
            return Userdrivertrip({
                user: item, status: true, driverTrip: id, date: new Date()
            })
        })
        let deleteAllUserdrivertripByIdDriverTrip = await Userdrivertrip.deleteMany({ driverTrip: id })
        let insertAllUserDriverTripByIdDriverTrip = await Userdrivertrip.insertMany(userDriverTrips)
        if (!insertAllUserDriverTripByIdDriverTrip) {
            return res.status(500).json({
                status: false, msg: 'ko'
            })
        }
        const updatedDriverTrip = await DriverTrip.findByIdAndUpdate(id, {
            ...req.body, userDriverTrips: insertAllUserDriverTripByIdDriverTrip.map(item => item._id)
        }, { new: true })
        if (updatedDriverTrip) {
            return res.status(200).json({
                status: true, data: updatedDriverTrip
            })
        } else {
            throw new Error('Error')
        }
    } catch (error) {
        next(error)
    }

}

const deleteDriverTrip = asyncHandler(async (req, res) => {
    const { dtId } = req.params
    const deletedDriverTrip = await DriverTrip.findByIdAndDelete({ _id: dtId });
    return res.status(200).json({
        success: deletedDriverTrip ? true : false,
        deletedDriverTrip: deletedDriverTrip ? deletedDriverTrip : 'Cannot delete DriverTrip'
    });
});

const getDriverByCompany = async (req, res, next) => {
    const { phoneCompany, role } = req.query;
    try {
        const company = await Company.findOne({ phone: phoneCompany })
        const user = await User.find({ company: company._id, role: 'driver' })
        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

const getlistDriverTripAfterDate = async (req, res, next) => {
    const { phoneCompany, date } = req.query;
    try {
        const company = await Company.findOne({ phone: phoneCompany });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        const trips = await Trip.find({ idCompany: company._id, });
        const tripIds = trips.map(trip => trip._id);
        const driver_trips = await DriverTrip
            .find({
                trip: {
                    $in: trips.map(trip => trip._id),
                }, date: { $gte: new Date(date) }
            }).populate({
                path: 'car', select: '-seats', populate: { path: 'company_id' }
            }).populate({
                path: 'trip', populate: [{ path: 'dropofflocation', select: 'nameProvince' }, {
                    path: 'pickuplocation', select: 'nameProvince'
                }]
            })
            .populate({
                path: 'userDriverTrips', populate: { path: 'user', select: 'firstname lastname mobile' }
            })

        res.status(200).json(driver_trips)
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const getlistByDATE = async (req, res, next) => {
    try {
        const { phoneCompany, date } = req.query
        if (!phoneCompany || !date) {
            return res.status(400).json({
                error: 'Bad request'
            })
        }
        const company = await Company.findOne({ phone: phoneCompany });
        if (!company) {
            return res.status(400).json({ error: 'Bad request' });
        }
        const trips = await Trip.find({ idCompany: company._id, });
        const tripIds = trips.map(trip => trip._id);
        const driver_trips = await DriverTrip.find({
            trip: {
                $in: trips.map(trip => trip._id),
            }, date: { $in: new Date(date) }
        }).populate({
            path: 'car', select: '-seats', populate: { path: 'company_id' }
        }).populate({
            path: 'trip', populate: [{ path: 'dropofflocation', select: 'nameProvince' }, {
                path: 'pickuplocation', select: 'nameProvince'
            }]
        })
            .populate({
                path: 'userDriverTrips', populate: { path: 'user', select: 'firstname lastname mobile' }
            })
        return res.status(200).json(driver_trips)
    } catch (error) {
        next(error)
    }
}

const getlistByIDTRIP = async (req, res, next) => {
    try {
        const { idtrip } = req.query
        const trip = await Trip.findById(idtrip);
        const driver_trips = await DriverTrip.find({ trip: trip._id })
            .populate({
                path: 'car', select: '-seats', populate: { path: 'company_id' }
            }).populate({
                path: 'trip', populate: [{ path: 'dropofflocation', select: 'nameProvince' }, {
                    path: 'pickuplocation', select: 'nameProvince'
                }]
            })
            .populate({
                path: 'userDriverTrips', populate: { path: 'user', select: 'firstname lastname mobile' }
            })
        return res.status(200).json(driver_trips)

    } catch (error) {
    }
}

const getlistByIDTRIPandDATE = async (req, res, next) => {
    try {
        const { idtrip, date } = req.query;
        const trip = await Trip.findById(idtrip);
        const driver_trips = await DriverTrip.find({ trip: trip._id, date: { $in: new Date(date) } })
            .populate({
                path: 'car', select: '-seats', populate: { path: 'company_id' }
            }).populate({
                path: 'trip', populate: [{ path: 'dropofflocation', select: 'nameProvince' }, {
                    path: 'pickuplocation', select: 'nameProvince'
                }]
            })
            .populate({
                path: 'userDriverTrips', populate: { path: 'user', select: 'firstname lastname mobile' }
            })
        return res.status(200).json(driver_trips)
    } catch (error) {
        next(error)
    }
}

const getlistDriverTripAfterDateANDTRIP = async (req, res, next) => {
    try {
        const { idtrip, date } = req.query;
        const trip = await Trip.findById(idtrip);
        const driver_trips = await DriverTrip.find({ trip: trip._id, date: { $gte: new Date(date) } })
            .populate({
                path: 'car', select: '-seats', populate: { path: 'company_id' }
            }).populate({
                path: 'trip', populate: [{ path: 'dropofflocation', select: 'nameProvince' }, {
                    path: 'pickuplocation', select: 'nameProvince'
                },

                ]
            })
            .populate({
                path: 'userDriverTrips', populate: { path: 'user', select: 'firstname lastname mobile' }
            })
        return res.status(200).json(driver_trips)
    } catch (error) {
        next(error)
    }
}

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params
        const driver_trip = await DriverTrip.findById(id)
            .populate({
                path: 'car', select: '-seats', populate: [{ path: 'company_id', path: 'typecar_id' }]
            })
            .populate({
                path: 'trip', populate: [{ path: 'dropofflocation', select: 'nameProvince' }, {
                    path: 'pickuplocation', select: 'nameProvince'
                }, { path: 'pickupLocations' }, { path: 'dropoffLocations' }
                ]
            })
            .populate({
                path: 'userDriverTrips', populate: { path: 'user', select: 'firstname lastname mobile' }
            })
            .populate({
                path: 'seats', select: 'numberName'
            })
            .populate({
                path: 'seats_bookings', select: 'id'
            })

        return res.status(200).json(driver_trip)
    } catch (error) {
        console.log(error)
    }
}

// [GET] danh sách các lịch xe khi biết nơi khởi hành nơi kết thúc và thời gian đi
const getListDriverTripStartAnnEndAndDate = async (req, res, next) => {
    const { locatestart, locateend, date } = req.query;
    try {
        const stationStart = await Stations.find({ addressDetail: { $regex: locatestart, $options: 'i' } });
        const stationEnd = await Stations.find({ addressDetail: { $regex: locateend, $options: 'i' } });
        const trips = await Trip.find({
            $and: [{ pickuplocation: { $in: stationStart } }, { dropofflocation: { $in: stationEnd } }]
        });
        const drivertrip = await DriverTrip.find({ $and: [{ date: { $gte: new Date(date) } }, { trip: { $in: trips } }] })
            .populate({
                path: 'trip',
                populate: { path: 'pickupLocations pickuplocation dropofflocation idCompany' }
            })
            .populate({ path: 'car', populate: [{ path: 'typecar_id' }, { path: 'company_id', select: 'name' }] })

        return res.json(drivertrip);
    } catch (e) {
        next(e);
    }
};
module.exports = {
    createDriverTrip,
    getDriverTrip,
    getAllDriverTrip,
    updateDriverTrip,
    deleteDriverTrip,
    getDriverByCompany,
    getlistDriverTripAfterDate,
    getlistByDATE,
    getlistByIDTRIP,
    getlistByIDTRIPandDATE,
    getlistDriverTripAfterDateANDTRIP,
    getOne,
    getListDriverTripStartAnnEndAndDate
}