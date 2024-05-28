import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import EmployeeAPI from '../../../../api/ApiEmployee';
import { useNavigate, useLocation } from 'react-router-dom';
function FormAddEmployee() {



  const [status, setStatus] = useState('add');

  const getemployee = (response) => {
    if (response) {
      console.log(response.role)
      formData.name = response.firstname + response.lastname;
      formData.phone = response.mobile;
      formData.email = response.email;
      formData.status = response.status;
      formData.password = response.password;
      formData.role = response.role;
      formData.phoneCompany = response.company.phone;
      formData.licenseNumber = response.licenseNumber;
    }
  }


  const location = useLocation();
  const status_ = new URLSearchParams(location.search).get('status');
  const id = new URLSearchParams(location.search).get('id');


  const navigate = useNavigate();
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
    if (id && status_) {
      setStatus(status_);
      const temp = JSON.parse(id)
      getemployee(temp);
      setSelectedRole(temp.role)
    }
  }, []);


  const [selectedRole, setSelectedRole] = useState('');
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    console.log(selectedRole)
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  };
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    status: true,
    password: '',
    role: '',
    phoneCompany: '',
    licenseNumber: '',
  });


  const isFormDataValid = () => {
    const { name, phone, email, status, password, role, phoneCompany } = formData;
    return phone && name && status && password && role && phoneCompany && email;
  };

  const edit = async () => {
    formData.role = selectedRole;
    formData.phoneCompany = phoneCompany;
    console.log(formData)

    if (!isFormDataValid()) {
      alert("Vui lòng điền đầy đủ thông tin1!");
      return;
    }


    if (formData.role !== 'driver') {
      formData.licenseNumber = '';
    } else {
      if (formData.licenseNumber === '') {
        alert("Vui lòng điền đầy đủ thông tin!");
        return
      }
    }

    const tempdata = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      status: true,
      role: formData.role,
      phoneCompany: formData.phoneCompany,
      licenseNumber: formData.licenseNumber,
    }

    try {
      console.log(tempdata)
      const response = await EmployeeAPI.update(formData.phone, tempdata);
      console.log(response);
      alert("Update thành công!");
    } catch (error) {
      // Xử lý lỗi
      console.error('Error adding car:', error.response.data);
      alert('Error adding car:' + error.response.data);
    }
  }

  const handleAdd_ = async () => {

    // xử lí fisrt name và last name 
    if (formData.name.length > 1) {
      var nameParts = formData.name.split(' ');
      formData.firstname = nameParts[0];
      formData.lastname = nameParts.slice(1).join(' ');
    }
    else {
      formData.firstname = " "
      formData.lastname = formData.name
    }

    formData.role = selectedRole;
    formData.phoneCompany = phoneCompany;
    if (!isFormDataValid()) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (formData.role !== 'driver') {
      formData.licenseNumber = '';
    } else {
      if (formData.licenseNumber === '') {
        alert("Vui lòng điền đầy đủ thông tin!");
        return
      }
    }
    const regex = /^0\d+/;
    if (regex.test(formData.phone)) {
    } else {
      alert("Số điện thoại phải bắt đầu bằng 0");
      return;
    }

    console.log(formData)
    try {
      const response = await EmployeeAPI.add(formData);
      console.log(response);
      setFormData({
        name: '',
        phone: '',
        email: '',
        status: true,
        password: '',
        role: '',
        phoneCompany: '',
        licenseNumber: '',
      });
      alert("Upload thành công!");
    } catch (error) {
      // Xử lý lỗi
      console.error('Error adding car:', error.response.data);
      alert('Error adding car:' + error.response.data);
    }
  }

  const quaylai = () => {
    navigate('/he-thong/managementstaff/employee')
  }


  return (
    <div className="w-full">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <div className="mb-4">
          <label className="block text-gray-700  font-bold mb-2" htmlFor="username">
            Họ Và Tên:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="name"
            required
            readOnly={status === 'see' ? true : false}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Số điện thoại:
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            placeholder="Phone Number"
            required
            readOnly={status === 'see' ? true : false}

            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Email:
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="email"
            readOnly={status === 'see' ? true : false}

            required
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {status === 'add' && (<div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Mật khẩu tài khoản đăng nhập
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="text"
            placeholder="password"
            required
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>)}

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Số điện thoại công ty:
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="phoneCompany"
            type="text"
            placeholder="phoneCompany"
            name="phoneCompany"
            required
            readOnly={true}
            value={phoneCompany}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Trạng thái (true or false):
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="status"
            type="text"
            placeholder="status"
            name="status"
            required
            value={formData.status}
            onChange={handleInputChange}
          />
        </div>


        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Role
          </label>
          <select id="countries" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"

            onChange={handleRoleChange}
            value={selectedRole}
            readOnly={status === 'see' ? true : false}
            required

          >
            <option selected>Choose a ROLE</option>
            <option value="staff">nhân viên</option>
            <option value="driver">tài xế</option>
            <option value="owner">chủ nhà xe</option>
          </select>
        </div>


        {selectedRole === 'driver' && (
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Bằng Lái Xe:
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="licenseNumber"
              type="text"
              placeholder="Bằng lái xe"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
            />
          </div>
        )}




        <div className="flex items-center justify-between">

          {status === 'add' && Cookies.get('role') === 'owner' && (
            <button
              onClick={handleAdd_}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Thêm hoặc Sửa Nhân Viên
            </button>
          )}
          {status === 'see' && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Bạn đang xem thông tin nhân viên
            </button>
          )}
          {status === 'edit' && Cookies.get('role') === 'owner' && (
            <button
              onClick={edit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Chỉnh sửa thông tin
            </button>
          )}

          <button
            onClick={quaylai}
            className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Quay Lại
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 ">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
}

export default FormAddEmployee;