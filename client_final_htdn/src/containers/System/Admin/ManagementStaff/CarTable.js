import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import TypeCarAPI from '~/api/TypeCarAPI';
import Modal from 'react-modal';

import CarAPI from '~/api/CarAPI';
const CarTable = () => {

  const [company, setCompany] = useState({});
  const [typecars, setTypecars] = useState([]);

  const [phoneCompany, setPhoneCompany] = useState('');
  useEffect(() => {
    // Get the user object from cookies
    const company_ = Cookies.get('company');
    //console.log(company_)
    if (company_) {
      // Parse the JSON string back to an object
      const userObject = JSON.parse(company_);
      setCompany(userObject);
      setPhoneCompany(userObject.phone);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TypeCarAPI.getlist();
        setTypecars(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    dateOfMade: '',
    availability: true,
    phoneCompany: phoneCompany,
    typeCar: '',
  });
  const [selectedTypeCar, setSelectedTypeCar] = useState('');






  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const data = await CarAPI.getlist(JSON.parse(Cookies.get('company')).phone);
        setCars(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCarData();
  }, []);



  const handleTypeCarChange = (e) => {
    setSelectedTypeCar(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'availability' ? e.target.checked : value,
    });
  };


  const handleAdd = async () => {

    setFormData({
      id: '',
      availability: false,
      phoneCompany: company.phone,
      typeCar: '',
    });
    openModal();
  };


  const handleAdd_ = async () => {

    const car = {
      id: formData.id,
      licenseplates: formData.id,
      availability: formData.availability,
      phoneCompanyId: formData.phoneCompany,
      typeCarId: selectedTypeCar,
    }

    console.log(car);

    if (car.id === null || car.id === '' || car.typeCar === '') {
      alert("Nhập đầy đủ thông tin")
      return
    }


    try {
      const response = await CarAPI.addone(car);
      console.log(response);
      setCars([...cars, response]);
      setFormData({
        id: '',
        availability: false,
        phoneCompany: company.phone,
        typeCar: '',
      });
      alert("Upload thành công!");

    } catch (error) {
      // Xử lý lỗi
      console.error('Error adding car:', error.response.data);
      alert('Error adding car:' + error.response.data);
    }

  };

  const [foundSeats, setFoundSeats] = useState([]);
  const xemdanhsachchongoi = (id) => {
    console.log(id)
    const selectedCar = cars.find((car) => car.id === id);

    if (selectedCar) {
      // Get the seats from the selected car
      const seats = selectedCar.seats || [];

      console.log(seats)
      // Set the found seats in the state
      setFoundSeats(seats);
    } else {
      // Handle if the car with the given ID is not found
      console.log('Car not found');
    }
    openOwner();


  }
  const handleupdate = (id, availability) => {

    console.log(id)
    console.log(availability);

    try {
      CarAPI.update(id, !availability);
      console.log('Car availability updated successfully');
      const updatedCars = cars.map((carItem) => {
        if (carItem.id === id) {
          return { ...carItem, availability: !availability };
        }
        return carItem;
      });

      setCars(updatedCars);
    } catch (error) {
      console.error('Error updating car availability:', error);
    }


  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      console.log(file);
      const token = Cookies.get('access_token');
      try {
        const response = await axios.post('/api/v1/owner/cars/list', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });

        // Handle the response from the server (e.g., display success message or process data)
        console.log('Upload successful:', response.data);
        setCars((prevTypecars) => [...prevTypecars, ...response.data]);
      } catch (error) {
        // Handle errors (e.g., display error message)
        console.error('Upload failed:', error);
      }
    } else {
      // Handle the case where no file is selected (e.g., display a message)
      console.error('Please select a file to upload.');
    }
  };

  const [isOpenModalOwnwer, setIsOpenModalOwnwer] = useState(false);
  const openOwner = () => {
    setIsOpenModalOwnwer(true);
  };
  const clodeOwner = () => {
    setIsOpenModalOwnwer(false);
  };
  const customStyles_ = {
    content: {
      width: '400px',
      margin: 'auto',

      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      backgroundColor: '#fff',
      height: '500px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <div>
      {Cookies.get('role') === 'OWNER' &&
        <button
          onClick={handleAdd}
          className="bg-blue-500 m-4 p-4 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          Thêm xe chạy
        </button>
      }
      {Cookies.get('role') === 'OWNER' &&
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
            onClick={handleUpload}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            disabled={!file}
          >
            Upload
          </button>
        </div>
      }
      <table className="min-w-full table table-success table-striped">
        <thead>
          <tr>
            <th className="px-4 py-2">Biển số xe</th>
            <th className="px-4 py-2">Tình trạng</th>
            <th className="px-4 py-2">Số điện thoại nhà xe</th>
            <th className="px-4 py-2">Thuộc loại xe</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td className="border px-4 py-2">{car.id}</td>
              <td className="border px-4 py-2">
                {car.availability ? 'Hoạt động' : 'Ngừng hoạt động'}
              </td>
              <td className="border px-4 py-2">{phoneCompany}</td>
              <td className="border px-4 py-2">{car.typeCar.name}</td>
              <td className="border px-4 py-2">

                <button
                  onClick={() => handleupdate(car.id, car.availability)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full text-lg m-2"
                >
                  Thay đổi trạng thái
                </button>
                <button
                  onClick={() => xemdanhsachchongoi(car.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full text-lg m-2"
                >
                  danh sách chỗ ngồi
                </button>

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
            height: '400px',

          },
        }}
      // Add your modal styles and positioning here
      >

        <div className="p-2 mt-4 bg-lime-100">
          <h2 className="text-xl font-bold">Car Form</h2>
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2">Biển số xe</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 w-full"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2">
              Tình trạng hoạt động
            </label>
            <input
              type="checkbox"
              className="border rounded-lg px-3 py-2 w-full"
              name="availability"
              checked={formData.availability}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2">
              Thuộc công ty
            </label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 w-full"
              name="phoneCompany"
              value={phoneCompany}
              readOnly={true}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2">Loại xe</label>
            <select id="typeCar" value={selectedTypeCar} onChange={handleTypeCarChange}>
              <option value="">Select a TypeCar</option>
              {typecars.map((typeCar) => (
                <option key={typeCar.id} value={typeCar.id}>
                  {typeCar.name}
                </option>
              ))}
            </select>

          </div>
          <div>

            <button
              onClick={handleAdd_}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
            >
              Add
            </button>
            <button
              onClick={() => {
                setFormData({
                  id: '',
                  availability: false,
                  phoneCompany: phoneCompany,
                  typeCar: '',
                });
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Clear
            </button>
          </div>
        </div>

      </Modal>


      <Modal
        isOpen={isOpenModalOwnwer}
        onRequestClose={clodeOwner}
        contentLabel="Owner"
        style={customStyles_}
        className={""}
      >
        <button className='m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={clodeOwner}>Close</button>

        <h2>Seat Information</h2>
        <ul>
          {foundSeats.map((seat) => (
            <li key={seat.id}>
              <div className='m-4 bg-amber-100'><p>Mã chỗ ngồi : {seat.id}</p> <p>Tên chỗ ngồi: {seat.name}</p></div>
            </li>
          ))}
        </ul>

      </Modal>

    </div>
  );
};

export default CarTable;
