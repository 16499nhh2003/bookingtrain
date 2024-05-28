import TripDetail from "./TripDetail";
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
// import Button from "~/components/Button";
import { Button } from "react-bootstrap";
import config from "../../../../config";
import { useLocation } from 'react-router-dom';
import DriverTripAPI from '../../../../api/ApiDriverTrip';

function  ListTrip() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [trips, setTrips] = useState([]);
  const tripId = searchParams.get('tripId');
  const rows = [];
  for (let i = 0; i < trips.length; i += 1) {
    rows.push(trips.slice(i, i + 1));
  }
  const [selectedDay, setSelectedDay] = useState(null);
  const handleDateChange = (selectedDate) => {

    const tempdate = selectedDate.split("-");
    const date = tempdate[1] + "/" + tempdate[2] + "/" + tempdate[0];
    fetchDataListDriverAfterCurrentDate_(date);
    console.log(date);


  };
  function getCurrentDateFormatted() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();

    return `${month}/${day}/${year}`;
  }



  const fetchDataListDriverAfterCurrentDate = async () => {
    try {
      const date = getCurrentDateFormatted();
      const data = await DriverTripAPI.getlistDriverTripAfterDateANDTRIP(date, tripId);
      console.log(data)
      setTrips(data.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchDataListDriverAfterCurrentDate_ = async (datetofilter) => {
    try {
      const data = await DriverTripAPI.getlistDriverTripAfterDateANDTRIP(datetofilter, tripId);
      setTrips(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchDataListDriverAfterCurrentDate();
  }, []);


  return (
    <>

      <div>
        {/* <Button to={config.routes.AdddUserTrip} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Quay Lại
        </Button> */}
        <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant="outline-primary">
          Quay Lại
        </Button>

        <div className="md:w-1/3">
          <label htmlFor="datepicker" className="block text-gray-600 mb-2">
            Select a Day
          </label>
          <input
            type="date"
            id="datepicker"
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            value={selectedDay}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>

      </div>
      <div className="flex flex-wrap">

        {rows.map((row, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            {row.map((trip) => (
              <TripDetail trip={trip} key={trip.id} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default ListTrip;