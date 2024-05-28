import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState, useEffect } from 'react';
import TripCheckbox from './TripCheckbox';
import { Row, Col } from 'react-bootstrap';
import TripAPI from '../../../../api/ApiTrip';
import Cookies from 'js-cookie';
import { da, tr } from 'date-fns/locale';
import DriverTripAPI from '../../../../api/ApiDriverTrip';



function Promotion() {
  const [formData, setFormData] = useState({
    id: '',
    code: '',
    description: '',
    discountAmount: '',
    trips: '',
    company: JSON.parse(Cookies.get('company')).phone,
    startDate: '',
    endDate: '',
  });

  const [selectedTrips, setSelectedTrips] = useState([]);

  const handleCheckboxChange = (event) => {
    const tripId = event.target.value;
    console.log(tripId)
    if (event.target.checked) {
      setSelectedTrips([...selectedTrips, tripId]);
    } else {
      setSelectedTrips(selectedTrips.filter((id) => id !== tripId));
    }
  };


  const [trips, setTrips] = useState([])

  const [promotions, setPromotions] = useState([])

  const fetchDataTRIPs = async () => {
    try {
      const data = await TripAPI.getListPHONECOMPANY(JSON.parse(Cookies.get('company')).phone);
      setTrips(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchPromotion = async () => {
    try {
      const data = await DriverTripAPI.postpromotion(formData)
      console.log(data)
      alert("DONE!");
      setFormData({
        id: '',
        code: '',
        description: '',
        discountAmount: '',
        trips: '',
        company: JSON.parse(Cookies.get('company')).phone,
        startDate: '',
        endDate: '',
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchPromotiongetData = async () => {

    try {
      const data = await DriverTripAPI.getPromotionList(JSON.parse(Cookies.get('company')).phone)
      setPromotions(data.data)
      console.log(data.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  useEffect(() => {
    fetchDataTRIPs();
  }, []);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormDataValid = () => {
    for (const key in formData) {
      // Skip the check for the 'id' field
      if (key === 'id') continue;

      if (formData[key] === null || formData[key] === undefined || formData[key] === '') {
        return false; // Invalid if any field is null, undefined, or empty
      }
    }
    return true; // All fields are valid
  };

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    formData.trips = selectedTrips.join('-');
    formData.company = JSON.parse(Cookies.get('company')).phone
    formData.code = generateRandomCode() + JSON.parse(Cookies.get('company')).phone
    if (isFormDataValid()) {
      console.log(formData)
      console.log(selectedTrips)
      fetchPromotion();
    } else {
      // Handle the case where not all fields are valid
      alert('Please fill in all required fields.');
    }
  };

  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
      onSelect={(selectedKey) => {
        if (selectedKey === 'see') {
          fetchPromotiongetData();
        }
      }}
    >
      <Tab eventKey="add" title="Khuyến Mãi">
        <div className="mt-6 mx-4">

          <Row>
            <Col>
              <h2 className="text-2xl font-semibold mb-4">Khuyến mãi</h2>
              <form onSubmit={handleSubmit} className="w-full maformx-w-lg">
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                    Mô tả:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="border rounded w-full py-2 px-3"
                    placeholder="Enter promotion description"
                    rows="4"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="discountAmount" className="block text-gray-700 font-bold mb-2">
                    Giá giảm khuyến mãi (VNĐ)
                  </label>
                  <input
                    type="number"
                    id="discountAmount"
                    name="discountAmount"
                    className="border rounded w-full py-2 px-3"
                    placeholder="Enter discount amount"
                    value={formData.discountAmount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="startDay" className="block text-gray-700 font-bold mb-2">
                    Ngày Bắt Đầu
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="border rounded w-full py-2 px-3"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="endDay" className="block text-gray-700 font-bold mb-2">
                    Ngày Kết thúc
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    name="endDate"
                    className="border rounded w-full py-2 px-3"
                  />
                </div>





                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Thêm
                  </button>
                </div>
              </form>
            </Col>

            <Col>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Các Tuyến đường áp dụng khuyến mãi</label>
                {trips.map((trip) => (
                  <TripCheckbox
                    key={trip._id}
                    trip={trip}
                    selectedTrips={selectedTrips}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                ))}
              </div>
            </Col>

          </Row>


        </div>

      </Tab>
      <Tab eventKey="see" title="Xem tất cả chương trình khuyến mãi">
        <div className="mt-6 mx-4">
          <h2 className="text-2xl font-semibold mb-4">See All Promotions</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Mã</th>
                <th className="px-4 py-2">mô tả</th>
                <th className="px-4 py-2">Giá giảm</th>
                <th className="px-4 py-2">Ngày bắt đầu</th>
                <th className="px-4 py-2">Ngày kết thúc</th>
                <th className="px-4 py-2">Danh sách tuyến</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promotion) => (
                <tr key={promotion._id}>
                  <td className="border px-4 py-2">{promotion.code}</td>
                  <td className="border px-4 py-2">{promotion.description}</td>
                  <td className="border px-4 py-2">{promotion.discountAmount}</td>
                  <td className="border px-4 py-2">{promotion.startDate}</td>
                  <td className="border px-4 py-2">{promotion.endDate}</td>
                  <td className="border px-4 py-2">
                    <select
                    >
                      <option value={null}>danh sách tuyến</option>

                      {promotion.trips
                        .map((trip) => (
                          <option key={trip._id} value={trip._id}>
                            Trip ---{trip.pickuplocation.nameProvince} -{trip.dropofflocation.nameProvince}
                            - {trip.pickUpTime} -  {trip.dropOffTime}
                          </option>
                        ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Tab>
    </Tabs>
  );
}

export default Promotion;