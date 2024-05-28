const Seats = require('../models/seats')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');

const createSeats = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing input');

    const newSeats = await Seats.create({
        ...req.body
    });

    return res.status(200).json({
        success: newSeats ? true : false,
        newSeats: newSeats ? newSeats : 'Cannot create new Seats'
    });
});

const getSeats = asyncHandler(async(req, res)=>{
    const { sId } = req.params
    const seats = await Seats.findOne({_id: sId})
    return res.status(200).json({
        success: seats ? true : false,
        SeatsData: seats ? seats : 'Cannot get Seats'
    })
})

const getAllSeats = asyncHandler(async(req, res)=>{
    const seats = await Seats.find();
    return res.status(200).json({
        success: seats ? true : false,
        SeatsData: seats ? seats : 'Cannot get all Seats'
    })
})

const updateSeats = asyncHandler(async(req, res)=>{
    const { sId} = req.params
    const updatedSeats = await Seats.findByIdAndUpdate(sId, req.body, {new: true})
    return res.status(200).json({
        success: updatedSeats ? true : false,
        updatedSeats: updatedSeats ? updatedSeats : 'Cannot update Seats'
    })
})

const deleteSeats = asyncHandler(async (req, res) => {
    const { sId} = req.params
    const deletedSeats = await Seats.findByIdAndDelete({ _id: sId });
    return res.status(200).json({
        success: deletedSeats ? true : false,
        deletedSeats: deletedSeats ? deletedSeats : 'Cannot delete Seats'
    });
});

module.exports = {
    createSeats,
    getSeats,
    getAllSeats,
    updateSeats,
    deleteSeats
}