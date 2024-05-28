const TypeCar = require('../models/typecar')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify');

const createTypeCar = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing input');

    const newTypeCar = await TypeCar.create({
        ...req.body
    });

    return res.status(200).json({
        success: newTypeCar ? true : false,
        newTypeCar: newTypeCar ? newTypeCar : 'Cannot create new Type Car'
    });
});

const getTypeCar = asyncHandler(async (req, res) => {
    const { tcId } = req.params
    const typeCar = await TypeCar.findOne({ _id: tcId })
    return res.status(200).json({
        success: typeCar ? true : false,
        typeCarData: typeCar ? typeCar : 'Cannot get type Car'
    })
})

const getAllTypeCar = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const totalItems = await TypeCar.countDocuments();
    const totalPages = Math.ceil(totalItems / limit)

    const typeCar = await TypeCar.find()
        .skip((page - 1) * limit)
        .limit(limit)

    const result = {
        metadata: {
            totalItems,
            totalPages,
            currentPage: page,
            itemsPerPage: limit
        },
        data: typeCar
    };

    return res.status(200).json({
        success: result ? true : false,
        typeCars: result ? result : 'Cannot get all type Car'
    })
})

const getAllTypeCar1 = asyncHandler(async (req, res) => {
    const typeCar = await TypeCar.find()
    return res.status(200).json({
        success: typeCar ? true : false,
        typeCars: typeCar ? typeCar : 'Cannot get all type Car'
    })
})


const updateTypeCar = asyncHandler(async (req, res) => {
    const { tcId } = req.params
    const updatedTypeCar = await TypeCar.findByIdAndUpdate(tcId, req.body, { new: true })
    return res.status(200).json({
        success: updatedTypeCar ? true : false,
        updatedTypeCar: updatedTypeCar ? updatedTypeCar : 'Cannot update Type Car'
    })
})

const deleteTypeCar = asyncHandler(async (req, res) => {
    const { tcId } = req.params
    const { isHide } = req.body;

    const deletedTypeCar = await TypeCar.findByIdAndUpdate(
        tcId,
        { isHide }
    );
    return res.status(200).json({
        success: deletedTypeCar ? true : false,
        deletedTypeCar: deletedTypeCar ? deletedTypeCar : 'Cannot delete Type Car'
    });
});

module.exports = {
    createTypeCar,
    getTypeCar,
    getAllTypeCar,
    updateTypeCar,
    deleteTypeCar,
    getAllTypeCar1
}