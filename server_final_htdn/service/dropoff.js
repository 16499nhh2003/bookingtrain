const DropffModel = require('../models/location_dropoff')
const TripModel = require('../models/trip')


// POST ONE PICKUP
const createOnePickUp = ({detailLocation, timePickUp, idtrip}) => new Promise(async (resolve, reject) => {
    try {

        const trip = await TripModel.findById(idtrip);
        if (!trip) {
            return reject(new Error("Trip not found"));
        }

        const existingPickup = await DropffModel.findOne({
            name: detailLocation, timeDropOff: timePickUp, trip: trip._id
        });
        if (existingPickup) {
            return reject(new Error("Pickup already exists"));
        }

        const createdPickup = await DropffModel.create({
            name: detailLocation, timeDropOff: timePickUp, trip: trip._id,
        });

        if(createOnePickUp){
            trip.dropoffLocations.push(createdPickup._id)
            await trip.save()
        }


        resolve(createdPickup);
    } catch (error) {
        reject(error);
    }
});


// POST LIST PICKUP
const createPickUps = ({pickups}) => new Promise(async (resolve, reject) => {
    try {
        const createdPickups = [];

        for (const pickup of pickups) {
            const {name, timePickUp, idTrip} = pickup;

            const trip = await TripModel.findById(idTrip);
            if (!trip) {
                return reject(new Error("Trip not found"));
            }

            const existingPickup = await DropffModel.findOne({name, timePickUp, trip: trip._id});
            if (existingPickup) {
                return reject(new Error("Pickup already exists"));
            }

            const createdPickup = await DropffModel.create({
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
const updateDropOff = async ({id, name, timeDropOff, trip}) => new Promise(async (resolve, reject) => {
    try {
        const res = await DropffModel
            .findByIdAndUpdate(id, {name, timeDropOff, trip}, {new: true})
        resolve(res)
    } catch (e) {
        reject(e)
    }
})


module.exports = {
    createOnePickUp, createPickUps, updateDropOff
}