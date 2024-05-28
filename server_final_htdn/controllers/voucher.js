const Voucher = require('../models/voucher')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');

const createVoucher = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing input');

    const { user_id, value } = req.body;

    const user = await User.findById(user_id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.points < 400) {
        return res.status(400).json({ success: false, message: 'Not enough points to create voucher' });
    }

    user.points -= 400;
    await user.save();

    const newVoucher = await Voucher.create({
        ...req.body,
        value: 10
    });

    return res.status(200).json({
        success: true,
        newVoucher
    });
});

const getVoucher = asyncHandler(async(req, res)=>{
    const { vId } = req.params
    const voucher = await Voucher.findOne({_id: vId})
    return res.status(200).json({
        success: voucher ? true : false,
        voucherData: voucher ? voucher : 'Cannot get Voucher'
    })
})

const getAllVoucher = asyncHandler(async(req, res)=>{
    const voucher = await Voucher.find();
    return res.status(200).json({
        success: voucher ? true : false,
        vouchers: voucher ? voucher : 'Cannot get all Voucher'
    })
})

const updateVoucher = asyncHandler(async(req, res)=>{
    const { vId} = req.params
    const updatedVoucher = await Voucher.findByIdAndUpdate(vId, req.body, {new: true})
    return res.status(200).json({
        success: updatedVoucher ? true : false,
        updatedVoucher: updatedVoucher ? updatedVoucher : 'Cannot update Voucher'
    })
})

const deleteVoucher = asyncHandler(async (req, res) => {
    const { vId} = req.params
    const deletedVoucher = await Voucher.findByIdAndDelete({ _id: vId });
    return res.status(200).json({
        success: deletedVoucher ? true : false,
        deletedVoucher: deletedVoucher ? deletedVoucher : 'Cannot delete Voucher'
    });
});

module.exports = {
    createVoucher,
    getVoucher,
    getAllVoucher,
    updateVoucher,
    deleteVoucher
}