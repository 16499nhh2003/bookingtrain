import React from 'react';

function TripCheckbox({ trip, selectedTrips, handleCheckboxChange }) {
  return (
    <div key={trip._id} className="mb-2">
      <input
        type="checkbox"
        id={`trip_${trip._id}`}
        name={`trip_${trip._id}`}
        value={trip._id}
        onChange={handleCheckboxChange}
        className="mr-2"
        checked={selectedTrips.includes(trip._id)}
      />
      <label htmlFor={`trip_${trip._id}`}>{trip.pickuplocation.nameProvince} - {trip.dropofflocation.nameProvince} -- ({trip.pickUpTime} - {trip.dropOffTime})</label>
    </div>
  );
}

export default TripCheckbox;
