import React from 'react';
import Button from '~/components/Button';
import config from '~/config';
import { useNavigate } from 'react-router-dom';

const TripTable = ({ trips }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-100 text-left  leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Địa Điểm đi
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left  leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Địa Điểm Đến 
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left  leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Giờ Đi
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left  leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Giá(VND)
            </th>
            <th className="px-6 py-3 bg-gray-100">Xử Lý</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td className="px-6 py-4 whitespace-no-wrap">{trip.pickupLocation}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{trip.dropoffLocation}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{trip.pickupTime}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{trip.price}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Button to={`${config.routes.ListTrip}?tripId=${trip.id}`} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                  Đặt chỗ
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripTable;
