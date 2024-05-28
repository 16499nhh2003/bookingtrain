const PickupModel = require('../models/location_pickup')
const TripModel = require('../models/trip')
const services = require('../service/pickup')
const Pickup = require("../models/location_pickup");

// GET LIST PICKUPS BY TRIP
const getPickUpByTrip = async (req, res) => {
    const {idTrip} = req.params;
    try {


    } catch (e) {

    }
}


// POST PICKUP
const createPickUp = async (req, res, next) => {
    try {
        const response = await services.createOnePickUp(req.body)
        return res.status(201).json(response)
    } catch (e) {
        next(e)
    }
}

//POST PICKUPS
const createPickUps = async (req, res, next) => {

    const {idTrip} = req.params;
    try {
        const response = await services.createPickUps(req.body)
        const pickupLocations = response.map(pickup => pickup._id);

        await TripModel.findByIdAndUpdate(idTrip, {pickupLocations}, {new: true})
            .then((resp => {
                return res.json('update info locations trip for  trip success ')
            }))
            .catch((err) => {
                throw err
            })


    } catch (e) {
        next(e)
    }
}

// [GET] get all locate by id trip
const getlistPICKUP = async (req, res, next) => {
    const {id} = req.params
    try {
        const locatepickup = await Pickup.find({trip: id})
        return res.json(locatepickup)

    } catch (e) {
        next(e)
    }
}

////// [PUT] upadte pick up of trip
const updatePickUp = async (req, res, next) => {
    const {id} = req.params
    try {
        const udpatedPickUp = await services.updatePickUp({
            id, req
        })
        return res.json(udpatedPickUp)
    } catch (e) {
        console.error(e)
        next(e)
    }
}
module.exports = {
    getPickUpByTrip, createPickUp, createPickUps, getlistPICKUP, updatePickUp
}