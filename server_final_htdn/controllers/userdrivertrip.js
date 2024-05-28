const User = require('../models/user')
const Userdrivertrip = require('../models/userdrivertrip')
const Company = require('../models/company')
const slugify = require('slugify');

// end point thêm lịch chạy xe cho nhân viên
const postOneEmployee = async (req, res, next) => {
    try {
        const {user, driverTrip, status, date} = req.body
        const newE = await Userdrivertrip.create({user, driverTrip, status, date})
        if (newE) {
            const userDriverTrip = await Userdrivertrip.findById(newE._id)
            return res.status(200).json({
                status: true, data: userDriverTrip
            })
        }
    } catch (error) {
        next(error)
    }
};

// end point lấy danh sách các nhân viên của công ty
const getlistbycompany = async (req, res, next) => {
    try {
        const {phoneCompany} = req.params
        const company = await Company.findOne({phone: phoneCompany})
        const employees = await User.find({company: company._id})
        return res.json({employees})
    } catch (error) {
        next(error)
    }
}

// controller thêm mới môt nhân viên
const addOne = async (req, res, next) => {
    const {email, firstname, lastname, licenseNumber, password, phone, phoneCompany, role, status} = req.body
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: "Badrequest! Missing input"
            })
        }

        const company = await Company.findOne({phone: phoneCompany})
        const employee = await User.create({
            email,
            firstname,
            lastname,
            licenseNumber,
            password,
            mobile: phone,
            company: company._id,
            role,
            status: status,
            isBlocked: false
        });

        res.status(201).json({
            message: "User created successfully", user: employee
        });

    } catch (error) {
        next(error)
    }
}

const updateOne = async (req, res, next) => {
    const {phoneUser} = req.params
    try {
        if (Object.keys(req.body).length === 0) return res.status(400).json('Bad request')
        const userUpdated = await User
            .findOneAndUpdate({mobile: phoneUser}, req.body, {new: true})
        return res.json(userUpdated)
    } catch (e) {
        next(e)
    }
}

const deleteOne = async (req, res, next) => {
    const {phoneUser} = req.params
    try {
        const userUpdated = await User
            .findOneAndUpdate({mobile: phoneUser}, {status: false}, {new: true})
        return res.json(userUpdated)
    } catch (e) {
        next(e)
    }
}
module.exports = {
    postOneEmployee,
    getlistbycompany,
    addOne,
    updateOne,
    deleteOne
}