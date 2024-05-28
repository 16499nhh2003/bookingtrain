const PickupModel = require('../models/location_pickup')
const TripModel = require('../models/trip')
const { resolve } = require("@babel/core/lib/vendor/import-meta-resolve");

// POST ONE PICKUP
const createOnePickUp = ({ detailLocation, timePickUp, idtrip }) => new Promise(async (resolve, reject) => {
    try {
        const trip = await TripModel.findById(idtrip);
        if (!trip) {
            return reject(new Error("Trip not found"));
        }

        const existingPickup = await PickupModel.findOne({ name: detailLocation, timePickUp, trip: trip._id });
        if (existingPickup) {
            return reject(new Error("Pickup already exists"));
        }

        const createdPickup = await PickupModel.create({
            name: detailLocation, timePickUp: timePickUp, trip: trip._id,
        });

        if(createOnePickUp){
            trip.pickupLocations.push(createdPickup._id)
            await trip.save()
        }

        resolve(createdPickup);
    } catch (error) {
        reject(error);
    }
});


// POST LIST PICKUP
const createPickUps = ({ pickups }) => new Promise(async (resolve, reject) => {
    try {
        const createdPickups = [];

        for (const pickup of pickups) {
            const { name, timePickUp, idTrip } = pickup;

            const trip = await TripModel.findById(idTrip);
            if (!trip) {
                return reject(new Error("Trip not found"));
            }

            const existingPickup = await PickupModel.findOne({ name, timePickUp, trip: trip._id });
            if (existingPickup) {
                return reject(new Error("Pickup already exists"));
            }

            const createdPickup = await PickupModel.create({
                name, timePickUp, trip: trip._id,
            });
            createdPickups.push(createdPickup);
        }

        resolve(createdPickups);
    } catch (error) {
        reject(error);
    }
});

// [PUT] udpate pick up =
const updatePickUp = async ({ id, req }) => new Promise(async (resolve, reject) => {
    try {
        const res = await PickupModel.findByIdAndUpdate(id, req.body, { new: true })
        resolve(res)
    } catch (e) {
        reject(e)
    }
})


module.exports = {
    createOnePickUp, createPickUps, updatePickUp
}