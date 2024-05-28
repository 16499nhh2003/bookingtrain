import React, { useState } from 'react';
import LocateDetailAPI from '../../../../api/LocateDetailAPI';
import Modal from 'react-modal';
import moment from "moment";


function EditDetailLocation({ data, selectedStatus, isEdit, onClose, onFileChange }) {
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

  const [formData, setFormData] = useState({
    id: data._id,
    detailLocation: data.name,
    timePickUp: data.time,
    idtrip: data.idtrip,
  });
  const selectedStatusValue = selectedStatus;
  const isEditValue = isEdit;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchDataAddPickUP = async () => {
    try {
      const data = await LocateDetailAPI.addonePICKUP(formData);
      alert("Thêm thành công!");
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
      alert("Thêm không thành công!");
    }
  };



  const fetchDataAddDropOFF = async () => {
    try {
      const data = await LocateDetailAPI.addoneDROPOFF(formData);
      alert("Thêm thành công!");
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
      alert("Thêm không thành công!");
    }
  };

  const fetchDataUpdatePickUp = async () => {
    try {
      const data = await LocateDetailAPI.updatePICKUP(formData.id, formData);
      if (data.status === 200) {
        alert("Chỉnh sửa thành công!");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert("Chỉnh sửa không thành công!");
    }
  };

  const fetchDataUpdateDropOFF = async () => {
    try {
      console.log(formData)
      const data = await LocateDetailAPI.updateDROPOFF(formData.id, { ...formData, timeDropOff: formData.timePickUp  , name : formData.detailLocation , trip: formData.idtrip});
      console.log(data)
      if (data.status === 200)
        alert("Chỉnh sửa thành công!");
      // 
    } catch (error) {
      console.error('Error fetching data:', error);
      alert("Chỉnh sửa không thành công!");
    }
  };

  const addOrUpdate = () => {
    console.log(formData)
    console.log(selectedStatus)
    console.log(isEdit)
    console.log(formData)
    if (formData.detailLocation === '' || formData.time === '' || formData.idtrip === null) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (selectedStatus === 'don') {
      if (!isEdit) {
        fetchDataAddPickUP();
      } else {
        fetchDataUpdatePickUp();
      }

    } else if (selectedStatus === 'tra') {
      if (!isEdit) {
        fetchDataAddDropOFF();
      } else {
        fetchDataUpdateDropOFF();
      }
    }
  };


  const fetchDeletePickUp = async () => {
    try {
      const data = await LocateDetailAPI.deletePICKUP(formData.id);
      alert("Xóa thành công!");
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
      alert("Thêm không thành công!");
    }
  }

  const fetchDeleteDropOff = async () => {
    try {
      const data = await LocateDetailAPI.deletePICKUP(formData.id);
      alert("Xóa thành công!");
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
      alert("Thêm không thành công!");
    }
  }


  const handleDelete = () => {
    openDeleteModal();
  };


  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    // Thực hiện xóa dữ liệu ở đây
    if (selectedStatus === 'don') {
      fetchDeletePickUp();
    } else {
      fetchDeleteDropOff();
    }
    closeDeleteModal();
  };


  const close = () => {
    // Handle the delete logic with the formData
    onClose();
    onFileChange(formData.idtrip);
    setFormData({
      id: '',
      detailLocation: '',
      time: '',
      idtrip: data.idtrip,
    })
  };

  return (
    <div className="container mx-auto mt-8 border-indigo-600 p-2 border-2">
      <h2 className="text-2xl font-semibold mb-4">Edit Detail Drop Off Location</h2>
      <div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">ID:</label>
          <input
            type="text"
            name="id"
            id="id"
            value={formData.id}
            readOnly={true}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">Chi tiết điểm:</label>
          <input
            type="text"
            name="detailLocation"
            value={formData.detailLocation}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">Giờ:</label>
          <input
            type="time"
            name="timePickUp"
            value={formData.timePickUp}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>

        <button onClick={addOrUpdate} className="bg-blue-500 mr-2 text-white px-4 py-2 rounded-lg">
          Save Changes
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg">
          Delete
        </button>
        <button onClick={close} className="bg-amber-400 mx-2 text-white px-4 py-2 rounded-lg">
          close
        </button>
      </div>
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

    </div>
  );
}

export default EditDetailLocation;
