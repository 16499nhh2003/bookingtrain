import React from 'react';
import TripTable from './TripTable';
import Cookies from 'js-cookie';
import TripAPI from '~/api/TripAPI';
import { useState, useEffect } from 'react';
import axios from 'axios';
const AdddUserTrip = () => {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TripAPI.getlist(JSON.parse(Cookies.get('company')).phone);
        setTrips(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


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
        const response = await axios.post('/api/v1/staff/booking/list', formData_, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });

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


  return (
    <div className="container mx-auto mt-8">


<div className="flex m-2 p-2 items-center space-x-2">
        <label className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer">
          <span>Booking bằng file csv</span>
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



      <h1 className="text-4xl font-semibold mb-4">Danh sách Tuyến đường</h1>
      <TripTable trips={trips} />
    </div>
  );
};

export default AdddUserTrip;
