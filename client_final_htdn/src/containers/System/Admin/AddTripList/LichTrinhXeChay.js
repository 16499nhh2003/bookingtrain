import { useNavigate } from 'react-router-dom';
import { differenceInDays, format, parseISO } from "date-fns";
import DriverTripAPI from '../../../../api/ApiDriverTrip';
import TripAPI from '../../../../api/ApiTrip';
import CarAPI from '../../../../api/ApiCar';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ModalDetailBooking from "./ModalDetailBooking";
const moment = require('moment');

function LichTrinhXeChay() {

  const navigate = useNavigate()
  const [tripdriver, setTripdriver] = useState([]);
  const [phoneCompany, setPhoneCompany] = useState('');
  const [cars, setCars] = useState([])
  const [trips, setTrips] = useState([])
  const [drivers, setDrivers] = useState([])


  const cookiessss = () => {
    // lấy dữ liệu từ dưới local lấy lên 
    const company_ = Cookies.get('company');
    if (company_) {
      const userObject = JSON.parse(company_);
      setPhoneCompany(userObject.phone);
    }
    else {
      // chuuyển trnag khi không có cookie của  nhà xe 
      alert('Bạn không có quyền ở đây')
      navigate('/')
    }
  }
  const fetchDataTRIPs = async () => {
    try {
      const data = await TripAPI.getlist(phoneCompany);
      console.log(data)
      setTrips(data.data.trips);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [typeCar, setTypeCar] = useState(new Map());
  const addKeyValue = (key, value) => {
    // Check if the key already exists
    if (!typeCar.has(key)) {
      // If not, update the state with the new key-value pair
      setTypeCar(new Map(typeCar.set(key, value)));
    } else {
      // If the key already exists, handle it as you see fit
      console.error('Key already exists:', key);
    }
  };

  const fetchDataCARs = async () => {
    try {
      const data = await CarAPI.getByCompany(phoneCompany);
      setCars(data.data.data);
      console.log(cars)
      // console.log(data)
      // {data.map((car) => (
      //   addKeyValue(car.typeCar.id,car.typeCar.name)
      // ))}
      // console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    console.log(typeCar)
  };
  const fetchDataDRIVERs = async () => {
    try {
      const data = await DriverTripAPI.getlistDriverForCompany('driver', phoneCompany);
      // console.log(data.data)
      setDrivers(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataDriverTripByIDTRIP = async (idTrip) => {
    try {
      const data = await DriverTripAPI.getlistByIDTRIP(idTrip);
      setTripdriver(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchDataDriverTripByDate = async (date) => {
    try {
      // console.log(phoneCompany , date)
      const data = await DriverTripAPI.getlistByDATE(phoneCompany, date);
      setTripdriver(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchDataDriverTripByDATEandTRIP = async (date, idtrip) => {
    try {
      const data = await DriverTripAPI.getlistBYDATEANDTRIP(date, idtrip);
      // console.log(data)
      setTripdriver(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function getCurrentDateFormatted() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Lưu ý rằng tháng bắt đầu từ 0
    const year = currentDate.getFullYear();

    return `${month}/${day}/${year}`;
  }

  const fetchDataListDriverAfterCurrentDate = async () => {
    try {
      const date = getCurrentDateFormatted();
      console.log(phoneCompany)
      const data = await DriverTripAPI.getlistDriverTripAfterDate(date, phoneCompany);
      console.log(data)
      setTripdriver(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchDataPostOneDriverTrip = async () => {
    try {
      const data = await DriverTripAPI.addone(formData);
      alert("Thêm thành công!")
      setFormData({
        id: '',
        date: getCurrentDate(),
        status: true,
        idtrip: '',
        idcar: '',
        drivers: '',
      })
    } catch (error) {
      alert("Thêm không thành công! Kiểm tra xem xe và tài xế có bị trùng ngày đi không!");
      console.error('Error fetching data:', error);
    }
  }

  const fetchDataEditOneDriverTrip = async () => {
    try {
      const data = await DriverTripAPI.editone(formData.id, formData);
      alert("Chỉnh sửa thành công!")
      fetchDataListDriverAfterCurrentDate();
    } catch (error) {
      alert("Chỉnh sửa không thành công! Kiểm tra xem xe và tài xế có bị trùng ngày đi không!");
      console.error('Error fetching data:', error);
    }
  }

  const fetchDataDeleteById = async () => {
    try {
      // const data = await DriverTripAPI.deleteById(iddelete);
      alert("Xóa thành công thành công!")
      fetchDataListDriverAfterCurrentDate();
    } catch (error) {
      alert("Chuyến đi này đã có người đặt bạn không thể xóa!");
      console.error('Error fetching data:', error);
    }
  }


  useEffect(() => {
    cookiessss();
  }, []);

  useEffect(() => {
    fetchDataDRIVERs();
    fetchDataCARs();
    fetchDataTRIPs();
    fetchDataListDriverAfterCurrentDate();
  }, [phoneCompany])


  const [formData, setFormData] = useState({
    id: '',
    date: '',
    status: true,
    idtrip: '',
    idcar: '',
    drivers: '',
  });

  const [isEditing, setIsEditing] = useState(false);


  const handleEdit = (_id) => {
    setIsEditing(true);
    const tripToEdit = tripdriver.find((trip) => trip._id === _id);
    if (tripToEdit) {
      const selectedDrivers = tripToEdit.userDriverTrips.map((userDriverTrip) => userDriverTrip.user.mobile).join('-');
      const formattedDate = moment(tripToEdit.date).format('yyyy-MM-DD');
      setFormData({
        id: tripToEdit._id,
        date: formattedDate,
        status: tripToEdit.status,
        idtrip: tripToEdit.trip._id,
        idcar: tripToEdit.car ? tripToEdit.car._id : "",
        drivers: selectedDrivers,
      });
      setIsEditing(true);
      openModal();
    }
  };

  const handleUpdate = () => {


    if (isFormDataValidUpdate()) {
      const dateFormatRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      // Chuyển đổi chuỗi ngày thành đối tượng Date

      if (!dateFormatRegex.test(formData.date)) {
        const parsedDate = parseISO(formData.date);
        // Format lại ngày theo định dạng "MM/dd/yyyy"
        const formattedDate = format(parsedDate, "MM/dd/yyyy");
        formData.date = formattedDate;
      }
      if (formData.drivers.startsWith('-')) {
        formData.drivers = formData.drivers.slice(1);
      } else {
        formData.drivers = formData.drivers;
      }
      fetchDataEditOneDriverTrip();
    } else {
      alert("Vui Lòng điền đầy đủ thông tin!")
      return;
    }
    console.log(formData)
  }

  const handleAdd = () => {
    if (isFormDataValidAdd()) {
      const selectedDate = new Date(formData.date);
      const currentDate = new Date();
      if (selectedDate <= currentDate) {
        alert("Trường 'date' không hợp lệ vì ngày đã qua!")
        return false;
      }
      if (formData.drivers.startsWith('-')) {
        formData.drivers = formData.drivers.slice(1);
      } else {
        formData.drivers = formData.drivers;
      }
      const list = formData.date.split("-");
      const datetemp = list[1] + "/" + list[2] + "/" + list[0]
      formData.date = datetemp
      fetchDataPostOneDriverTrip();
      setFormData({
        id: '',
        date: getCurrentDate(),
        status: true,
        idtrip: '',
        idcar: '',
        drivers: '',
      })
    } else {
      alert("Vui Lòng điền đầy đủ thông tin!")
      return;
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked, id } = e.target;

    if (name === 'drivers') {
      // For "Select Drivers", you can directly update the formData's "drivers" property
      setFormData({
        ...formData,
        drivers: value,
      });
    } else if (type === 'checkbox') {
      // For checkboxes, toggle the checked state
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      // For other input fields, update their respective properties in formData
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleDriverCheckboxChange = (driverPhone) => {
    // Create a copy of the selected drivers array
    const selectedDrivers = formData.drivers.split('-');

    // Toggle the driver's phone number in the array
    if (selectedDrivers.includes(driverPhone)) {
      // If the driver is already selected, remove them
      selectedDrivers.splice(selectedDrivers.indexOf(driverPhone), 1);
    } else {
      // If the driver is not selected, add them
      selectedDrivers.push(driverPhone);
    }

    // Join the selected drivers' phone numbers with hyphens
    const selectedDriversString = selectedDrivers.join('-');

    // Update the formData with the new string
    setFormData({
      ...formData,
      drivers: selectedDriversString,
    });
  };


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isModalOpen__, setIsModalOpen__] = useState(false);

  const openModal__ = () => {
    setIsModalOpen__(true);
  };

  const closeModal__ = () => {
    setIsModalOpen__(false);
  };



  const handleAdd_ = () => {
    setFormData({
      id: '',
      date: getCurrentDate(),
      status: true,
      idtrip: '',
      idcar: '',
      drivers: '',
    })
    setIsEditing(false);
    openModal();
  }

  const handleAdd__ = () => {
    setFormData_({
      phoneCompany: phoneCompany,
      idTrip: '',
      start: '',
      end: '',
      typecar: ''
    })
    openModal__();

  }


  const [formData_, setFormData_] = useState({
    // phoneCompany: "",
    phoneCompany: JSON.parse(Cookies.get('company')).phone,
    idTrip: '',
    start: '',
    end: '',
    typecar: ''
  });

  // Hàm định dạng ngày MM/dd/yyyy
  function formatDate(date) {
    const formattedDate = new Date(date).toISOString().slice(0, 10);
    return formattedDate;
  }

  const isFormDataValidAdd = () => {
    // Lọc ra tất cả các trường trừ 'id' và kiểm tra xem chúng không bị thiếu
    const fieldsToCheck = Object.keys(formData).filter((key) => key !== 'id');

    return fieldsToCheck.every((key) => formData[key] !== null && formData[key] !== '');
  };

  const isFormDataValidUpdate = () => {
    return Object.values(formData).every((value) => value !== null && value !== '');
  };



  const customStyles = {
    content: {
      width: '400px',
      margin: 'auto',

      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      backgroundColor: '#fff',
      height: '110px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const [iddelete, setIddelete] = useState(null);
  const handleDelete = (id) => {
    setIddelete(id);
    openDeleteModal();
  };




  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    fetchDataDeleteById();
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const [dateSearch, setDateSearch] = useState(getCurrentDate());
  const [tripSearch, setTripSearch] = useState('');

  const getbydate = () => {
    // console.log(dateSearch)
    const datetmep = dateSearch.toString().split("-")[1] + "/" + dateSearch.toString().split("-")[2] + "/" + dateSearch.toString().split("-")[0];
    fetchDataDriverTripByDate(datetmep)
  };
  const getbytrip = () => {
    fetchDataDriverTripByIDTRIP(tripSearch)
  }
  const getbytripandate = () => {
    const datetmep = dateSearch.toString().split("-")[1] + "/" + dateSearch.toString().split("-")[2] + "/" + dateSearch.toString().split("-")[0];
    fetchDataDriverTripByDATEandTRIP(datetmep, tripSearch);
  }


  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload_ = async () => {
    if (file) {
      const formData_ = new FormData();
      formData_.append('file', file);
      const token = Cookies.get('access_token');
      try {
        const response = await axios.post('/api/v1/staff/drivertrip/list', formData_, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        setCars((prevTypecars) => [...prevTypecars, ...response.data]);

        setFile(null);
        alert("Upload Thành Công!")
      } catch (error) {
        // Handle errors (e.g., display error message)
        setFile(null);
        alert('Upload failed:', error);
      }
    } else {
      setFile(null);
      // Handle the case where no file is selected (e.g., display a message)
      alert('Please select a file to upload.');
    }
  };

  const handexemdetailve = (id) => {
    console.log(id)
    console.log(tripdriver)
    const foundTripdriver = tripdriver.find((trip) => trip._id === id);
    setOneDriverTrip(foundTripdriver);
    console.log(oneDriverTrip)
    openModal_();
  }

  const [isModalOpen_, setIsModalOpen_] = useState(false);
  const [oneDriverTrip, setOneDriverTrip] = useState(null);

  const openModal_ = () => {
    setIsModalOpen_(true);
  };

  const closeModal_ = () => {
    setIsModalOpen_(false);
  };

  const handleInputChange__ = (e) => {
    const { name, value } = e.target;
    setFormData_({ ...formData_, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform the action you want with the form data, e.g., make a POST request

    if (formData_.start.split("-").length > 1 && formData_.end.split("-").length > 1) {

      const start = formData_.start.split("-");
      formData_.start = start[1] + "/" + start[2] + "/" + start[0];

      const end = formData_.end.split("-");
      formData_.end = end[1] + "/" + end[2] + "/" + end[0];
    }
    console.log('Form data submitted:', formData_);
    try {
      // const response = await DriverTripAPI.addAutomatic(formData_);
      // console.log(response)
      // alert("Thêm thành công!")
      // setTripdriver((prevTypecars) => [...prevTypecars, ...response]);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert("Thêm không thành công!")
    }



  };

  return (
    <div>

      <div className='mb-4 flex justify-center'>

        <div className='border-b-4 border-indigo-500 mx-4'>
          <input
            type="date" // Keep the input type as "text"
            className="border rounded-lg px-3 py-2 w-small" // Add a class for width
            name="date"
            value={dateSearch}
            onChange={(e) => setDateSearch(e.target.value)}
          />tìm kiếm chuyến đi
          <button onClick={getbydate} class="h-10 px-2 p2-4 m-2  text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">tìm theo ngày</button>
        </div>

        <div className='border-b-4 border-indigo-500 mx-4'>
          <select
            name="idtrip"
            value={tripSearch}
            className="border w-52 rounded-lg px-3 py-2  "
            onChange={(e) => setTripSearch(e.target.value)}
          >
            <option value="">Select a Trip</option>
            {trips.map((trip) => (
              <option key={trip._id} value={trip._id}>
                {trip.pickuplocation.nameProvince} - {trip.dropofflocation.nameProvince} -- Giờ đi: {trip.pickUpTime}
                -- Giờ đến: {trip.dropOffTime}
              </option>
            ))}
          </select>
          <button onClick={getbytrip} class="h-10 px-2 p2-4 m-2  text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">tìm theo chuyến đi</button>
        </div>
        <div className='border-b-4 border-indigo-500 mx-4'>
          <button onClick={getbytripandate} class="h-10 px-2 p2-4 m-2  text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">tìm theo chuyến đi và theo ngày</button>
        </div>

      </div>

      <button
        onClick={handleAdd_}
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
        Thêm Tuyến đường
      </button>
      <br />

      <button
        onClick={handleAdd__}
        className="bg-blue-500 hover:bg-blue-400 my-2 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
        Thêm Tuyến đường tự động
      </button>

      <div className="flex m-2 p-2 items-center space-x-2">
        <label className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer">
          <span>Select CSV File</span>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        <span className="text-gray-600">{file ? file.name : 'No file selected'}</span>
        <button
          onClick={handleUpload_}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          disabled={!file}
        >
          Upload
        </button>
      </div>

      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Ngày đi</th>
            <th className="px-4 py-2">Trạng thái</th>
            <th className="px-4 py-2">Tên tuyến</th>
            <th className="px-4 py-2">Biển số xe</th>
            <th className="px-4 py-2">Danh sách tài xế</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tripdriver.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item._id}</td>
              <td className="border px-4 py-2">{format(new Date(item.date), "yyyy-MM-dd") + '-' + item.trip.pickUpTime}</td>
              <td className="border px-4 py-2">{item.status ? 'Active' : 'Inactive'}</td>
              <td className="border px-4 py-2">{item.trip.pickuplocation.nameProvince} đến {item.trip.dropofflocation.nameProvince} -- Giờ đi: {item.trip.pickUpTime} --- Giờ kết thúc : {item.trip.dropOffTime}</td>
              <td className="border px-4 py-2">{item.car.license_plates}</td>
              <td className="border px-4 py-2">{item.userDriverTrips
                ? item.userDriverTrips
                  // .filter(item1 => item1.user?.name !== "Tài Xế") // Filter out items where user.name is "Tài Xế"
                  .map(item1 => item1.user?.firstname + ' ' + item1.user?.lastname)
                  .join(', ')
                : ""}
              </td>
              <td className="border px-4 py-2">
                <>
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="bg-blue-500 text-white font-bold py-1 px-2 rounded-full mr-2"
                  >
                    sửa
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white font-bold py-1 px-2 rounded-full"
                  >
                    xóa
                  </button>

                  <button
                    onClick={() => handexemdetailve(item._id)}
                    className="text-white font-bold mt-2 px-2 bg-amber-400 rounded-full"
                  >
                    xem thông tin vé
                  </button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <Modal

        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Company Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            border: 'none',
            borderRadius: '10px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '1000px',
            height: '550px',

          },
        }}

      >
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Add/Edit Tripdriver</h2>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">ID</label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 w-full"
                name="id"
                id='id'
                readOnly={true}
                value={formData.id}
                onChange={handleInputChange}
              />
            </div>
            {
              isEditing ? (
                <div className="mb-2">
                  <label className="block text-gray-700 font-bold mb-2">Ngày đi (MM/dd/yyyy):</label>
                  <input
                    type="date" // Keep the input type as "text"
                    className="border rounded-lg px-3 py-2 w-full"
                    name="date"
                    id='date'
                    readOnly={isEditing ? true : false}
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
              ) : (
                <div className="mb-2">
                  <label className="block text-gray-700 font-bold mb-2">Ngày đi (MM/dd/yyyy):</label>
                  <input
                    type="date" // Keep the input type as "text"
                    className="border rounded-lg px-3 py-2 w-full"
                    name="date"
                    id='date'
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
              )}

            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">Trạng thái:</label>
              <input
                type="checkbox"
                className="border rounded-lg px-3 py-2 w-full"
                name="status"
                id='status'
                checked={formData.status}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">Thuộc tuyến đường:</label>
              <select
                name="idtrip"
                id='idtrip'
                value={formData.idtrip}
                readOnly={isEditing ? true : false}
                disabled={isEditing ? true : false}
                onChange={handleInputChange}
                className="border rounded-lg px-3 py-2 w-full"
              >
                <option value="">Select a Trip</option>
                {trips.map((trip) => (
                  <option key={trip._id} value={trip._id}>
                    {trip.pickuplocation.nameProvince} - {trip.dropofflocation.nameProvince} -- Giờ đi: {trip.pickUpTime}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">Chọn xe cho chuyến đi:</label>
              <select
                name="idcar"
                value={formData.idcar}
                id='idcar'
                onChange={handleInputChange}
                className="border rounded-lg px-3 py-2 w-full"
              >
                <option value="">Select a Car</option>
                {cars.map((car) => (
                  <option key={car._id} value={car._id}>
                    {car.license_plates} - {car.typecar_id.type_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">Chọn tài xế cho chuyến đi:</label>
              {drivers.map((driver) => (
                <div key={driver.mobile} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`driver-${driver._id}`}
                    name={`driver-${driver.mobile}`}
                    checked={formData.drivers.split("-").includes(driver.mobile)}
                    onChange={() => handleDriverCheckboxChange(driver.mobile)}
                    className="mr-2 w-fit"
                  />
                  <label htmlFor={`driver-${driver._id}`}>{driver.firstname + driver.lastname + driver.mobile}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded-full mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
              >
                Add
              </button>
            )}
          </div>
          {/* Existing table code for displaying the list */}
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        style={customStyles}
        contentLabel="Delete Confirmation Modal"
      // Thêm các kiểu và các thuộc tính khác theo mong muốn
      >
        <h2>Xác nhận xóa?</h2>
        <div>
          <button onClick={confirmDelete} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg   px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
          <button onClick={closeDeleteModal} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2">Cancel</button>
        </div>
      </Modal>

      <Modal
        isOpen={isModalOpen__}
        onRequestClose={closeModal__}
        contentLabel="Tự Độnh"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            border: 'none',
            borderRadius: '10px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '1000px',
            height: '550px',

          },
        }}
      >

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
          <div className="mb-4">
            <label htmlFor="phoneCompany" className="block text-gray-700  font-bold mb-2">Số điện thoại nhà xe:</label>
            <input
              type="text"
              id="phoneCompany"
              name="phoneCompany"
              readOnly={true}
              value={''}
              // value={JSON.parse(Cookies.get('company')).phone}
              onChange={handleInputChange__}
              className="w-full border p-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="idTrip" className="block text-gray-700  font-bold mb-2">Tuyến đường:</label>
            <select
              id="idTrip"
              name="idTrip"
              value={formData_.idTrip}
              onChange={handleInputChange__}
              className="w-full border p-2"
            >
              <option value="">Select a Trip</option>
              {trips.map((trip) => (
                <option key={trip.id} value={trip.id}>
                  {trip.pickupLocation} - {trip.dropoffLocation}({trip.pickupTime}-{trip.dropoffTime})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="start" className="block text-gray-700  font-bold mb-2">Ngày bắt đầu:</label>
            <input
              type="date"
              id="start"
              name="start"
              value={formData_.start}
              onChange={handleInputChange__}
              className="w-full border p-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="end" className="block text-gray-700  font-bold mb-2">Ngày kết thúc:</label>
            <input
              type="date"
              id="end"
              name="end"
              value={formData_.end}
              onChange={handleInputChange__}
              className="w-full border p-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="typecar" className="block text-gray-700  font-bold mb-2">Loại xe (nhà xe phải có xe thuộc loại dưới):</label>
            <select
              id="typecar"
              name="typecar"
              value={formData_.typecar}
              onChange={handleInputChange__}
              className="w-full border p-2"
            >
              <option value="">Select Type Car</option>
              {[...typeCar].map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
              {/* Add more options as needed */}
            </select>
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Submit</button>
        </form>

      </Modal>
      <Modal
        isOpen={isModalOpen_}
        onRequestClose={closeModal_}
        contentLabel="Company Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            border: 'none',
            borderRadius: '10px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '1000px',
            height: '550px',

          },
        }}
      // Add your modal styles and positioning here
      >
        <ModalDetailBooking data={oneDriverTrip} />

      </Modal>

    </div>
  );
}

export default LichTrinhXeChay;
