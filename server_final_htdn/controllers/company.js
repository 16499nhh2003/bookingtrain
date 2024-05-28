const Company = require('../models/company')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');
const User = require('../models/user');

const createCompany = async (req, res, next) => {
    const {desc, email, name, phone, status, vnp_HashSecret, vnp_TmnCode} = req.body;
    console.log(req.body)
    try {
        if (Object.keys(req.body).length === 0) return res.status(400).json('Bad request')

        const newCompany = await Company.create({
            phone, name, desc, email, isStatus: status, vnp_TmnCode, vnp_HashSecret
        });

        if (newCompany) {
            return res.status(201).json(newCompany)
        }
        throw new Error('Không tạo được công ty')

    } catch (e) {
        console.error(e)
        next(e)
    }

};

const getCompany = async (req, res) => {
    const {cId} = req.params
    const company = await Company.findOne({_id: cId})
    return res.status(200).json({
        success: company ? true : false, companyData: company ? company : 'Cannot get company'
    })
}

// controller  lấy các công ty theo trạng thái hoạt động
const getListCompanyActivity = async (req, res, next) => {
    const {status} = req.params
    try {
        let companies = await Company.find({isStatus: status ? status : true});
        return res.json(companies)
    } catch (e) {
        next(e)
    }
}

const updateCompany = async (req, res, next) => {
    const {id} = req.params
    try {
        console.log(req.body)
        if (Object.keys(req.body).length === 0) return res.status(400).json('Bad request')
        const updatedCompany = await Company.findByIdAndUpdate(id, req.body, {new: true})
        if (updatedCompany) {
            return res.status(200).json(updatedCompany)
        }
        // throw new Error('Cập nhật không thành công')

    } catch (e) {
        next(e)
    }
}

const deleteCompany = async (req, res, next) => {
    const {phone} = req.params
    try {
        const deletedCompany = await Company.findOneAndUpdate({phone}, {isStatus: false});
        return res.json('ok')
    } catch (e) {
        next(e)
    }
};

const getCompanyByUser = asyncHandler(async (req, res) => {
    const {idUser} = req.params
    const company = await Company.findOne({user_id: idUser});
    res.status(200).json({
        success: company ? true : false, data: company || 'Not found'
    });
})

const getCompanyByPhoneUser = async (req, res, next) => {
    try {
        const {mobile} = req.query
        const user = await User.findOne({mobile})
        const company = await Company.findById(user.company._id);
        if (company) {
            return res.status(200).json(company)
        }
        throw new Error('không tìm thấy')
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createCompany,
    getCompany,
    getListCompanyActivity,
    updateCompany,
    deleteCompany,

    getCompanyByUser,
    getCompanyByPhoneUser
}