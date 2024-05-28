
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Col, Row } from 'react-bootstrap';
import EditDetailLocation from './EditDetailLocation';
import Cookies from 'js-cookie';
import TripAPI from '../../../../api/ApiTrip';
import LocateDetailAPI from '../../../../api/LocateDetailAPI';
import axios from 'axios';
import moment from "moment";
function DetailLocation() {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const [detailPickUpLocations, setDetailPickUpLocations] = useState([
    {
      id: '',
      detailLocation: '',
      time: '',
      idtrip: selectedTrip
    }
  ]);

  const [detailDropOffLocations, setDetailDropOffLocations] = useState([
    {
      id: '',
      detailLocation: '',
      time: '',
      idtrip: selectedTrip
    }
  ]);

  const [formData, setFormData] = useState({
    id: '',
    detailLocation: '',
    time: '',
    idtrip: selectedTrip
  });

  const fetchDataPickUp = async (id) => {
    try {
      const data = await LocateDetailAPI.getlistPICKUP(id);
      setDetailPickUpLocations(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataDropOff = async (id) => {
    try {
      const data = await LocateDetailAPI.getlistDROPOFF(id);
      setDetailDropOffLocations(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedTrip(e.target.value);
    fetchDataDropOff(e.target.value)
    fetchDataPickUp(e.target.value)
  };

  const [phoneCompany, setPhoneCompany] = useState('');

  
  useEffect(() => {
    const company_ = Cookies.get('company');
  
    if (company_) {
      const userObject = JSON.parse(company_);
      setPhoneCompany(userObject.phone);
    }

  console.log(phoneCompany)
  }, []);


  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (phoneCompany){
          const data = await TripAPI.getListPHONECOMPANY(phoneCompany);
          setTrips(data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [phoneCompany]);

  // const handleEditDropOff = (id) => {
  //   // Tìm TypeCar theo id và cập nhật dữ liệu trong form
  //   const Location = DetailDropOffLocation.find((location) => location.id === id);
  //   if (Location) {
  //     setFormData({...Location});
  //   }
  // };


  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const formData_ = new FormData();
      formData_.append('file', file);
      const token = Cookies.get('access_token');


      try {
        const response = await axios.post('/api/v1/staff/pickup/list', formData_, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        setDetailPickUpLocations((prevTypecars) => [...prevTypecars, ...response.data]);
        setFile(null);
        alert("Upload Thành Công!")
      } catch (error) {
        // Handle errors (e.g., display error message)
        setFile(null);
        alert('Upload failed:', error);
      }


      alert("Upload file Thành Công!")
    } else {
      setFile(null);
      // Handle the case where no file is selected (e.g., display a message)
      alert('Please select a file to upload.');
    }
  };

  const handleUpload_ = async () => {
    if (file) {
      const formData_ = new FormData();
      formData_.append('file', file);
      const token = Cookies.get('access_token');
      try {
        const response = await axios.post('/api/v1/staff/dropoff/list', formData_, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        setDetailDropOffLocations((prevTypecars) => [...prevTypecars, ...response.data]);
        setFile(null);
        alert("Upload Thành Công!")
      } catch (error) {
        // Handle errors (e.g., display error message)
        setFile(null);
        alert('Upload failed:', error);
      }

      alert("Upload file Thành Công!")
    } else {
      setFile(null);
      // Handle the case where no file is selected (e.g., display a message)
      alert('Please select a file to upload.');
    }
  };

  const handleAddDon = () => {
    setFormData({
      id: '',
      detailLocation: '',
      time: '',
      idtrip: selectedTrip,
    })
    openModal();
    setIsEdit(false);
    // console.log(formData)
    setSelectedStatus("don")
  }
  const handleAddTra = () => {
    setFormData({
      id: '',
      detailLocation: '',
      time: '',
      idtrip: selectedTrip,
    })
    openModal();
    setIsEdit(false);
    setSelectedStatus("tra")
  }
  console.log(selectedStatus)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (id, status) => {
    // Tìm Trip theo id và cập nhật dữ liệu trong form  
    setSelectedStatus(status)
    if (status === 'don') {
      const tripToEdit = detailPickUpLocations.find((trip) => trip._id === id);
      if (tripToEdit) {
        setFormData({ ...tripToEdit   , time : tripToEdit.timePickUp});
      }
    } else {
      const tripToEdit = detailDropOffLocations.find((trip) => trip._id === id);
      if (tripToEdit) {
        setFormData({ ...tripToEdit , time : tripToEdit.timeDropOff });
      }
    }

    setIsEdit(true);
    openModal();
  };

  const handleFileChange_ = (newFile) => {
    console.log(newFile);
    fetchDataPickUp(newFile)
    fetchDataDropOff(newFile);
  };


  return (
    <div>

      <label htmlFor="tripSelect" className="block text-gray-700 font-bold mb-2">
        Select a Trip:
      </label>
      <select
        id="tripSelect"
        className="border rounded-lg px-3 py-2 w-full"
        value={selectedTrip}
        onChange={handleSelectChange}
      >
        <option value="">Select a trip</option>
        {trips.map((trip) => (
          <option key={trip._id} value={trip._id}>
            Địa chỉ đi:   {trip.pickuplocation.nameProvince} -- Địa chỉ đến: {trip.dropofflocation.nameProvince} -- Giờ đi: {trip.pickUpTime} -- Giờ đến: {trip.dropOffTime}
          </option>
        ))}
      </select>
      {selectedTrip && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Chọn Tuyến đường:</h2>
          <p>ID: {selectedTrip}</p>
          {/* Hiển thị các thông tin khác của chuyến đi dựa trên ID đã chọn */}
        </div>
      )}

      <Row>

        <h2 className=" font-bold">Danh sách các điểm đón và trả khách hàng:</h2>

        <label className="bg-blue-500  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer">
          <span>Select CSV File</span>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        <Col lg={6} className="mt-4 ">
          <button
            onClick={handleAddDon}
            className="bg-blue-500 mx-4 hover:bg-blue-400 text-white font-bold py-2 px-4 ml-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Thêm điểm đón
          </button>
          <div className="flex m-2 p-2 items-center space-x-2">


            <button
              onClick={handleUpload}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded"
              disabled={!file}
            >
              Upload file cho điểm đón
            </button>
            <span className="text-gray-600">{file ? file.name : 'No file selected'}</span>
          </div>
          <table className="min-w-full  border-dashed border-2 border-r-indigo-500">
            <thead>
              <tr>
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Danh sách điểm đón</th>
                <th className="px-4 py-2">Thời gian đón</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className='overflow-scroll w-[100px]'>
              {detailPickUpLocations.map((trip) => (
                <tr key={trip._id}>
                  <td className="border px-4 py-2">{trip._id}</td>
                  <td className="border px-4 py-2">{trip.name}</td>
                  <td className="border px-4 py-2">{moment(trip.timePickUp, "HH:mm").format("hh:mm A")}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(trip._id, 'don')}
                      className="bg-blue-500 mb-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full mr-2"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
        <Col lg={6} className="mt-4  ">
          <button
            onClick={handleAddTra}
            className="bg-blue-500 hover:bg-blue-400 mx-4 text-white font-bold py-2 px-4 ml-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Thêm điểm Trả
          </button>
          <div className="flex m-2 p-2 items-center space-x-2">

            <button
              onClick={handleUpload_}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded"
              disabled={!file}
            >
              Upload file cho điểm trả
            </button>
            <span className="text-gray-600">{file ? file.name : 'No file selected'}</span>
          </div>
          <table className="min-w-full border-dashed border-2 border-l-indigo-500">
            <thead>
              <tr>
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Danh sách điểm trả</th>
                <th className="px-4 py-2">Thời gian đón</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className='overflow-scroll w-[100px]'>
              {detailDropOffLocations.map((trip) => (
                <tr key={trip._id}>
                  <td className="border px-4 py-2">{trip._id}</td>
                  <td className="border px-4 py-2">{trip.name}</td>
                  <td className="border px-4 py-2">{moment(trip.timeDropOff, "HH:mm").format("hh:mm A")}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(trip._id, 'tra')}
                      className="bg-blue-500 mb-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full mr-2"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>

      {/* <EditDetailLocation data={formData}/> */}
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
      >
        <EditDetailLocation data={formData} selectedStatus={selectedStatus} isEdit={isEdit} onClose={closeModal} onFileChange={handleFileChange_} />

      </Modal>


    </div>
  );
}

export default DetailLocation;