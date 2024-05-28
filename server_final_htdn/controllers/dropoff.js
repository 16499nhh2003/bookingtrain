const DropOff = require('../models/location_dropoff')
const asyncHandler = require('express-async-handler')
const services = require("../service/dropoff");
const Pickup = require("../models/location_pickup");

const getDropoff = async (req, res, next) => {
    const {id} = req.params
    try {
        const locatedropoff = await DropOff.find({trip: id})
        return res.json(locatedropoff)

    } catch (e) {
        next(e)
    }
}

const createDropoff = async (req, res, next) => {
    try {
        const response = await services.createOnePickUp(req.body)
        return res.status(201).json(response)
    } catch (e) {
        next(e)
    }
}

////// [PUT] upadte pick up of trip
const updatePickUp = async (req, res, next) => {
    const {id} = req.params
    const {name, timeDropOff, trip} = req.body;
    console.log(name , timeDropOff , trip)
    try {
        const udpatedPickUp = await services.updateDropOff({
            id,
            name,
            timeDropOff,
            trip
        })
        return res.json(udpatedPickUp)
    } catch (e) {
        console.error(e)
        next(e)
    }
}

module.exports = {
    getDropoff, createDropoff, updatePickUp
}