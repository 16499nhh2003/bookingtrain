import axios from 'axios';
import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Cookies from 'js-cookie';
// import TripAPI from '~/api/TripAPI';
// import provincesData from "~/Global/provincesData";
const provincesData = []
const TripTable = () => {

  const [phoneCompany, setPhoneCompany] = useState('');
  useEffect(() => {
    // Get the user object from cookies
    const company_ = Cookies.get('company');
    //console.log(company_)
    if (company_) {
      // Parse the JSON string back to an object
      const userObject = JSON.parse(company_);
      setPhoneCompany(userObject.phone);
    }
  }, []);




  const [trips, setTrips] = useState([

  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await TripAPI.getlist(JSON.parse(Cookies.get('company')).phone);
        // setTrips(data);
        // console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    id: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupTime: '',
    dropoffTime: '',
    urlimage: "https://storage.dx.gov.vn/Data/c_0/2022/10/07/1-638007365766931686.jpg",
    aboutHours: 0,
    status: true,
    price: 0,
    phoneCompany: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'aboutHours' || name === 'price' ? parseInt(value) : value,
    });
  };

  const handleAdd = async () => {
    // Thêm Trip mới vào danh sách
    // setTrips([...trips, { ...formData }]);
    // // Xóa dữ liệu trong form

    formData.phoneCompany = JSON.parse(Cookies.get('company')).phone;
    if (
      formData.pickupLocation.trim() === '' ||
      formData.dropoffLocation.trim() === '' ||
      formData.pickupTime.trim() === '' ||
      formData.dropoffTime.trim() === '' ||
      formData.aboutHours <= 0 ||
      formData.price <= 0
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    console.log(formData);
    try {
      // const response = await TripAPI.addone(formData);
      // console.log(response);
      // setTrips([...trips, { ...response }]);
      alert("Upload thành công!");
      setFormData({
        id: '',
        pickupLocation: '',
        dropoffLocation: '',
        pickupTime: '',
        status: true,
        urlimage: "https://storage.dx.gov.vn/Data/c_0/2022/10/07/1-638007365766931686.jpg",
        dropoffTime: '',
        aboutHours: 0,
        price: 0,
        phoneCompany: '',
      });
      closeModal();
    } catch (error) {
      // Xử lý lỗi
      console.error('Error adding car:', error.response.data);
      alert('Error adding car:' + error.response.data);
    }

  };


  const handleAdd_ = () => {
    setFormData({
      id: '',
      pickupLocation: '',
      dropoffLocation: '',
      status: true,
      pickupTime: '',
      urlimage: "https://storage.dx.gov.vn/Data/c_0/2022/10/07/1-638007365766931686.jpg",
      dropoffTime: '',
      aboutHours: 0,
      price: 0,
      phoneCompany: '',
    });
    setIsEditing(false);
    openModal();
  }

  const handleEdit = (id) => {
    // Tìm Trip theo id và cập nhật dữ liệu trong form
    const tripToEdit = trips.find((trip) => trip.id === id);
    if (tripToEdit) {
      setFormData({ ...tripToEdit });
      setIsEditing(true);
      openModal();
    }

  };

  const handleUpdate = async () => {

    formData.phoneCompany = JSON.parse(Cookies.get('company')).phone;
    if (
      formData.pickupLocation.trim() === '' ||
      formData.dropoffLocation.trim() === '' ||
      formData.pickupTime.trim() === '' ||
      formData.dropoffTime.trim() === '' ||
      formData.aboutHours <= 0 ||
      formData.price <= 0
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    console.log(formData);
    try {
      // const response = await TripAPI.editone(formData.id, formData);
      // console.log(response);
      // setTrips((prevTrips) =>
      //   prevTrips.map((trip) =>
      //     trip.id === formData.id ? { ...response } : trip
      //   )
      // );
      alert("Upload thành công!");
      setFormData({
        id: '',
        pickupLocation: '',
        dropoffLocation: '',
        pickupTime: '',
        status: true,
        urlimage: "https://storage.dx.gov.vn/Data/c_0/2022/10/07/1-638007365766931686.jpg",
        dropoffTime: '',
        aboutHours: 0,
        price: 0,
        phoneCompany: '',
      });
      closeModal();
    } catch (error) {
      // Xử lý lỗi
      console.error('Error adding car:', error.response.data);
      alert('Error adding car:' + error.response.data);
    }
  };

  const handleDelete = (id) => {
    // Xóa Trip theo id
    setTrips((prevTrips) =>
      prevTrips.filter((trip) => trip.id !== id)
    );
  };


  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Số lượng mục trên mỗi trang

  // Tính toán số trang
  const pageCount = Math.ceil(trips.length / itemsPerPage);

  // Lấy danh sách Trip cho trang hiện tại
  const currentTrips = trips.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Xử lý sự kiện khi chuyển trang
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value === 'true'; // Convert the value to a boolean
    setFormData({ ...formData, status: value });
  };


  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const formData_ = new FormData();
      formData_.append('file', file);
      formData_.append('id', formData.id);
      const token = Cookies.get('access_token');
      try {
        const response = await axios.post('/api/v1/staff/trip/updateimage', formData_, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });

        setTrips((prevTrips) =>
          prevTrips.map((trip) =>
            trip.id === response.id ? { ...response } : trip
          )
        );

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

  const handleUpload_ = async () => {
    if (file) {
      const formData_ = new FormData();
      formData_.append('file', file);
      const token = Cookies.get('access_token');
      try {
        const response = await axios.post('/api/v1/staff/trip/list', formData_, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });

        setTrips((prevTypecars) => [...prevTypecars, ...response.data]);
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


  const [searchKeywordStart, setSearchKeywordStart] = useState('');
  const handleSearchStart = (event) => {
    setSearchKeywordStart(event.target.value);
  };
  const filteredProvincesStart = provincesData.filter((province) =>
    province.name.toLowerCase().includes(searchKeywordStart.toLowerCase())
  );

  const handleChangeStart = (event) => {
    formData.pickupLocation = event.target.value;
    console.log(event.target.value);
  };

  const [searchKeywordEnd, setSearchKeywordEnd] = useState('');
  const handleSearchEnd = (event) => {
    setSearchKeywordEnd(event.target.value);
  };

  const handleChangeEnd = (event) => {
    formData.dropoffLocation = event.target.value;
    console.log(event.target.value);
  };
  const filteredProvincesEnd = provincesData.filter((province) =>
    province.name.toLowerCase().includes(searchKeywordEnd.toLowerCase())
  );
  return (
    <div>

      <button
        onClick={handleAdd_}
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
        Thêm Tuyến đường
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
            <th className="px-4 py-2">Địa điểm khởi hành</th>
            <th className="px-4 py-2">Địa điểm kết thúc</th>
            <th className="px-4 py-2">Giờ bắt đầu đi</th>
            <th className="px-4 py-2">Giờ đến</th>
            <th className="px-4 py-2">Số giờ</th>
            <th className="px-4 py-2">Giá</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTrips.map((trip) => (
            <tr key={trip.id}>
              <td className="border px-4 py-2">{trip.id}</td>
              <td className="border px-4 py-2">{trip.pickupLocation}</td>
              <td className="border px-4 py-2">{trip.dropoffLocation}</td>
              <td className="border px-4 py-2">{trip.pickupTime}</td>
              <td className="border px-4 py-2">{trip.dropoffTime}</td>
              <td className="border px-4 py-2">{trip.aboutHours}</td>
              <td className="border px-4 py-2">{trip.price}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(trip.id)}
                  className="bg-blue-500 mb-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full mr-2"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Phân trang */}
      <div className="mt-4 flex justify-center">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'pagination flex justify-center items-center space-x-2'}
          previousLinkClassName={'page-link bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}
          nextLinkClassName={'page-link bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}
          pageLinkClassName={'page-link bg-white text-gray-700 hover:bg-gray-200 font-bold py-2 px-4 rounded-full'}
          activeClassName={'active'}
          disabledClassName={'disabled'}
        />

      </div>

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
      // Add your modal styles and positioning here
      >


        <div className="mt-4">
          <h2 className="text-xl font-bold">Trip Form</h2>
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2">Image:</label>
            <img
              src={formData.urlimage}
              alt="Trip Image"
              className="w-full max-w-xs mb-2"
            />
            <div className="flex m-2 p-2 items-center space-x-2">
              <label className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer">
                <span>Thay đổi ảnh:</span>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png, .gif"
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
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2">ID:</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 w-full"
              name="id"
              value={formData.id}
              readOnly={true}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2">
              Điểm khởi hành:
            </label>
            <input
              type="text"
              value={searchKeywordStart}
              placeholder="Tìm kiếm nơi đến ở ..."

              onChange={handleSearchStart}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <select
              value={formData.pickupLocation}
              onChange={handleChangeStart}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="" disabled>-- Chọn tỉnh thành --</option>
              {filteredProvincesStart.map((province) => (
                <option key={province.id} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2">
              Điểm kết thúc:
            </label>
            <input
              type="text"
              value={searchKeywordEnd}
              placeholder="Tìm kiếm nơi đến ở đây..."
              onChange={handleSearchEnd}
              className="mt-1 p-2 block w-full shadow-2xl rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <select
              value={formData.dropoffLocation}
              onChange={handleChangeEnd}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="" disabled>-- Chọn tỉnh thành --</option>
              {filteredProvincesEnd.map((province) => (
                <option key={province.id} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2">Giờ khởi hành:</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 w-full"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2">Giờ đến:</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 w-full"
              name="dropoffTime"
              value={formData.dropoffTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2">Số giờ đi:</label>
            <input
              type="number"
              className="border rounded-lg px-3 py-2 w-full"
              name="aboutHours"
              value={formData.aboutHours}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2">Giá tuyến:</label>
            <input
              type="number"
              className="border rounded-lg px-3 py-2 w-full"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2">Trạng thái:</label>
            <select id="typeCar" value={formData.status} onChange={handleStatusChange}>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2">Số điện thoại nhà xe:</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 w-full"
              name="phoneCompany"
              value={phoneCompany}
              readOnly={true}
              onChange={handleInputChange}
            />
          </div>
          <div>
            {isEditing ? (
              <button
                onClick={handleUpdate}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2"
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
              >
                Add
              </button>
            )}
            <button
              onClick={() => {
                setFormData({
                  id: '',
                  pickupLocation: '',
                  dropoffLocation: '',
                  pickupTime: '',
                  dropoffTime: '',
                  aboutHours: 0,
                  status: true,
                  price: 0,
                  phoneCompany: phoneCompany,
                });
                setIsEditing(false);
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Clear
            </button>
          </div>
        </div>

      </Modal>
    </div>
  );
};

export default TripTable;
