import React from 'react';
import Button2 from "../../../../components/Button2";
import config from '../../../../config';
import moment from 'moment'
function TripDetail({ trip }) {
  return (
    <div className=" rounded overflow-hidden shadow-lg">
      <img className="w-full" src={trip.trip.imagePath[0]} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <span className="font-bold  mb-2">Địa Điểm Đi: </span><div >{trip.trip.pickuplocation.nameProvince}</div>
        <span className="font-bold  mb-2">Địa Điểm Đến: </span><div >{trip.trip.dropofflocation.nameProvince}</div>
        <span className="font-bold  mb-2">Ngày Đi: </span><div >{moment(trip.date).format('DD-MM-YYYY')}</div>
        <span className="font-bold  mb-2">Tên nhà xe: </span><div >{trip.car.company_id.name}</div>
        <span className="font-bold  mb-2">Giờ khởi hành: </span><div >{trip.trip.pickUpTime}</div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Button2 to={`${config.routes.Book}?driverTrip=${trip._id}&idtrip=${trip.trip._id}`} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" variant='outline-primary'>
          Đặt
        </Button2>
      </div>
    </div>
  );
}
export default TripDetail;