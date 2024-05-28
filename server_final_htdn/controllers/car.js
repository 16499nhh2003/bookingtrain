const Car = require('../models/car')
const Company = require('../models/company')
const Typecar = require('../models/typecar')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');
const uploadCloud = require('../config/cloudinary.config');
const Seat = require('../models/seats');

function generateSeatCodes(totalSeats, rows, seatsPerRow) {
    const seats = [];
    let remainingSeats = totalSeats;

    rows.forEach(row => {
        for (let i = 1; i <= seatsPerRow; i++) {
            if (remainingSeats > 0) {
                seats.push(`${row}${i}`);
                remainingSeats--;
            } else {
                return seats; // Trả về danh sách ghế khi đã sử dụng hết số ghế
            }
        }
    });

    return seats;
}


const createCar = async (req, res, next) => {
    try {
        const {
            license_plates,
            typecar_id,
            phone,
            availibility,
            isHide,
            images,
        } = req.body;

        if (Object.keys(req.body).length === 0) throw new Error('Missing input');
        // if (!req.files || req.files.length === 0) {
        //     throw new Error('No files uploaded');
        // }
        const company = await Company.findOne({ phone })
        if (!company) {
            throw new Error('Công ty không hợp lệ')
        }

        const newCar = new Car({
            license_plates,
            typecar_id,
            company_id: company._id,
            availibility: availibility || true,
            isHide: isHide || false,
            images: images || [],
        });

        // const uploadedImages = req.files.map(file => file.path);
        // newCar.images = uploadedImages
        const savedCar = await newCar.save()

        const typecar = await Typecar.findById(typecar_id);
        if (!typecar) {
            throw new Error('Typecar not found');
        }

        let seats;
        switch (typecar.type_name) {
            case 'Xe 24 chỗ':
                seats = generateSeatCodes(24, ['A', 'B', 'C', 'D', 'E'], 12);
                break;
            case 'Xe 29 chỗ':
                seats = generateSeatCodes(29, ['A', 'B', 'C', 'D', 'E'], 10);
                break;
            case 'Xe 35 chỗ':
                seats = generateSeatCodes(35, ['A', 'B', 'C', 'D', 'E'], 12);
                break;
            default:
                throw new Error('Invalid typecar');
        }


        const savedSeats = await Seat.create(seats.map(seat => ({ numberName: seat, car: savedCar._id })));

        // Cập nhật danh sách ghế vào xe
        savedCar.seats = savedSeats.map(seat => seat._id);
        await savedCar.save();

        const car = await Car.findById(savedCar._id).populate('typecar_id company_id')
        res.status(201).json(car);

    } catch (error) {
        if (error.code === 11000) return res.status(500).json({ msg: 'Thông xin xe đã tồn tại' })
        res.status(500).json({ message: ' At car controller' + error });
    }
};

const getCar = asyncHandler(async (req, res) => {
    const { cId } = req.params
    const car = await Car.findOne({ _id: cId }).populate("typecar_id company_id")
    return res.status(200).json({
        success: car ? true : false,
        CarData: car ? car : 'Cannot get Car'
    })
})

const getDataAllCar = asyncHandler(async (req, res) => {
    const car = await Car.find()
    return res.status(200).json({
        success: car ? true : false,
        CarData: car ? car : 'Cannot get Car'
    })
})

const getAllCar = asyncHandler(async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const totalItems = await Car.countDocuments();
    const totalPages = Math.ceil(totalItems / limit)

    const car = await Car.find({ isHide: false })
        .populate("typecar_id company_id")
        .skip((page - 1) * limit)
        .limit(limit);

    const result = {
        metadata: {
            totalItems,
            totalPages,
            currentPage: page,
            itemsPerPage: limit
        },
        data: car
    }
    return res.status(200).json({
        success: car ? true : false,
        Cars: car ? result : 'Cannot get all Car'
    })
})

const updateCar = asyncHandler(async (req, res) => {
    const { cId } = req.params

    if (!req.files || req.files.length === 0) {
        throw new Error('No files uploaded');
    }

    const car = await Car.findById(cId);
    if (!car) {
        throw new Error('Car not found');
    }

    const uploadedImages = req.files.map(file => file.path);
    car.images = uploadedImages;
    await car.save();
    return res.status(200).json({
        success: car ? true : false,
        updatedCar: car ? car : 'Cannot update Car'
    })
})

const deleteCar = asyncHandler(async (req, res) => {
    const { cId } = req.params
    const deletedCar = await Car.findByIdAndUpdate(cId, { isHide: true });
    return res.status(200).json({
        success: deletedCar ? true : false,
        deletedCar: deletedCar ? deletedCar : 'Cannot delete Car'
    });
});

const get_car_byIdCompany = async (req, res, next) => {
    const { phoneCompany } = req.params
    try {
        const company = await Company.findOne({ phone: phoneCompany })
        const cars = await Car.find({ company_id: company._id }).populate('typecar_id')
        if (cars)
            return res.status(200).json({
                status: true,
                data: cars
            })
    } catch (error) {
        next(error)
    }

}

module.exports = {
    createCar,
    getCar,
    getAllCar,
    updateCar,
    deleteCar,
    getDataAllCar,
    get_car_byIdCompany
}