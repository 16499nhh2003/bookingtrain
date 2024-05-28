const Seats = require('../models/seats')
const Station = require('../models/station')
const Company = require('../models/company')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');

const createStation = asyncHandler(async (req, res) => {
    const { companyPhone } = req.body;
    if (companyPhone) {
        let company = await Company.findOne({ phone: companyPhone })
        if (company)
            req.body = { ...req.body, company_id: company._id }
        else {
        }
    }
    if (Object.keys(req.body).length === 0) throw new Error('Missing input');

    const newSeats = await Station.create({
        ...req.body
    });

    return res.status(200).json({
        success: newSeats ? true : false,
        payload: newSeats ? newSeats : 'Cannot create new Seats'
    });
});

const getSeats = asyncHandler(async (req, res) => {
    const { sId } = req.params
    const seats = await Station.findOne({ _id: sId })
    return res.status(200).json({
        success: seats ? true : false,
        SeatsData: seats ? seats : 'Cannot get Seats'
    })
})

const getAllStations = async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    const sort = {};
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    if (endIndex < (await Station.countDocuments().exec())) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        };
    }

    try {
        const seats = await Station.find({})
            .populate("company_id")
            .sort(sort)
            .limit(limit)
            .skip(startIndex)
            .exec();
        return res.status(200).json(seats);
        next();
    } catch (err) {
        return res.status(500).send();
    }
}

const updateStationById = async (req, res, next) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['idProvince', 'idDistrict', 'idCommune', 'nameProvince', 'nameDistrict', 'nameCommune', 'address', 'name'];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );
    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid updates!' });
    try {
        const station = await Station.findByIdAndUpdate(
            req.params.id,
            { ...req.body, addressDetail: `${req.body.address}, ${req.body.nameCommune}, ${req.body.nameDistrict}, ${req.body.nameProvince}` },
            {
                new: true,
                runValidators: true,
            }
        );
        if (!station)
            return res.status(404).send({ error: 'Station not found!' });

        res.send(station);
    } catch (e) {
        res.status(500).send();
    }
}

const deleteSeats = asyncHandler(async (req, res) => {
    try {
        console.log(req.params.id)
        const station = await Station.findByIdAndDelete(req.params.id);
        if (!station)
            return res.status(404).send({ error: 'Station not found!' });
        res.status(200).json({ message: 'Delete successfully!' });
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = {
    createStation,
    getSeats,
    getAllStations,
    updateStationById,
    deleteSeats
}