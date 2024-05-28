import React, { useState } from 'react';
import BookingAPI from '../../../../api/ApiBooking';
const BookingForm = (drivertrip) => {
  const [formData, setFormData] = useState({
    status: 'Chưa Thanh Toán',
    idCar: '',
    listIdSeat: '',
    isProtect: false,
    fareAmount: '',
    description: '',
    phoneUser: '',
    idPickUp: '',
    idDropOff: '',
    iddriverTrip: '',
  });

  const isFormDataValid = () => {
    // Kiểm tra xem mỗi trường có giá trị không
    if (formData.status === '' || formData.idCar === '' || formData.iddriverTrip === '' || formData.listIdSeat === '' || formData.fareAmount === '' || formData.description === '' || formData.phoneUser === '') {
      return false;
    }
    return true;
  };

  if (!drivertrip.booking) {
    return <div>Loading...</div>;
  } else {
    formData.iddriverTrip = drivertrip.booking._id;
    formData.idCar = drivertrip.booking.car._id
    formData.fareAmount = drivertrip.booking.trip.price
  }

  const diemdi = drivertrip.booking.trip.pickuplocation.nameProvince
  const diemden = drivertrip.booking.trip.dropofflocation.nameProvince


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked, // Cập nhật trạng thái của isProtect
    });
  };


  const fetchDataSubmit = async () => {
    try {
      const myString = formData.listIdSeat;
      const wordsArray = myString.split("-");
      const wordCount = wordsArray.length;
      formData.fareAmount = wordCount * formData.fareAmount;

      console.log(formData)
      const data = await BookingAPI.addOneBooking(formData);
      console.log(data)
      alert("Booking Thành Công!")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUserState = localStorage.getItem('userState');
    formData.listIdSeat = storedUserState;

    if (isFormDataValid()) {
      fetchDataSubmit();
    } else {
      alert("Vui lòng điền đầy đủ thông tin!")
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>


        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Số điện thoại khách hàng
          </label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 w-full"
            name="phoneUser"
            value={formData.phoneUser}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Tuyến đường</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 w-full"
            name="trip"
            value={diemdi + " - " + diemden}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Mô tả
          </label>
          <textarea
            className="border rounded-lg px-3 py-2 w-full"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Trạng thái
          </label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 w-full"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Giá tiền
          </label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 w-full"
            name="fareAmount"
            readOnly
            value={formData.fareAmount}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">isProtect</label>
          <input
            type="checkbox"
            className="border rounded-lg px-3 py-2 w-full"
            name="isProtect"
            checked={formData.isProtect} // Sử dụng checked để đồng bộ trạng thái
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Biển số xe</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 w-full"
            name="idCar"
            value={formData.idCar}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Submit
          </button>
        </div>



      </form>
    </div>
  );
};

export default BookingForm;
