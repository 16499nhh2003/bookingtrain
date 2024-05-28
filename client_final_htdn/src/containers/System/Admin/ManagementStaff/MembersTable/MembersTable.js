import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Modal from 'react-modal';
import Button from '../../../../../components/Button2';
import config from "../../../../../config";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import EmployeeAPI from '../../../../../api/ApiEmployee';
import { useNavigate } from 'react-router-dom';

function MembersTable() {
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

  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [employees_, setEmployees_] = useState([]);
  const [phoneCompany, setPhoneCompany] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [phone, setPhone] = useState('');
  useEffect(() => {
    const company_ = Cookies.get('company');
    if (company_) {
      const userObject = JSON.parse(company_);
      setPhoneCompany(userObject.phone);
    }
  }, []);

  useEffect(() => {
    fetchEmployeeData();
  }, [phoneCompany]);


  const fetchEmployeeData = async () => {
    try {
      let data = await EmployeeAPI.getlistbycompany(phoneCompany);
      data = data.data.employees
      setEmployees(data);
      setEmployees_(data);
      console.log(employees_)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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

  const getemployee = (id) => {
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].mobile === id) {
        return employees[i];
      }
    }
  }


  const xemchitiet = (id) => {
    const temp = getemployee(id);
    const data = JSON.stringify(temp);
    navigate(`/he-thong/managementstaff/formaddemployee?id=${data}&status=see`);
  }
  const chinhsua = (id) => {
    const temp = getemployee(id);
    const data = JSON.stringify(temp);
    navigate(`/he-thong/managementstaff/formaddemployee?id=${data}&status=edit`);
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchQuery(searchValue);

    if (searchValue !== '') {
      // Filter employees based on the search query
      const filtered = employees.filter((employee) => {
        return employee.lastname.toLowerCase().includes(searchValue) || employee.firstname.toLowerCase().includes(searchValue);
      });
      setEmployees_(filtered);
    } else {
      setEmployees_(employees); // Reset to the original list when the search query is empty
    }
  }


  const handleDelete = (phone) => {
    setPhone(phone)
    openDeleteModal(); // Open the delete confirmation modal
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    const phonetemp = phone;
    try {
      const response = await EmployeeAPI.deleteEmployee(phonetemp);
      console.log(response);
      fetchEmployeeData();
    } catch (error) {
      // Xử lý lỗi
      console.error('Error adding company:', error.response.data);
      alert('Error adding company:' + error.response.data);
    }

    // Proceed with deletion

    closeDeleteModal(); // Close the delete confirmation modal
  };

  const [nghi, setNghi] = useState(true);
  const xemnhanviendanghi = () => {
    setNghi(!nghi);
  }

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
        const response = await axios.post('/api/v1/owner/employees/list', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });

        setEmployees((prevTypecars) => [...prevTypecars, ...response.data]);
        setEmployees_((prevTypecars) => [...prevTypecars, ...response.data]);
        // Handle the response from the server (e.g., display success message or process data)
        console.log('Upload successful:', response.data);
        alert("upload successful")
      } catch (error) {
        // Handle errors (e.g., display error message)
        console.error('Upload failed:', error);
        alert("upload failed")
      }
    } else {
      // Handle the case where no file is selected (e.g., display a message)
      console.error('Please select a file to upload.');
      alert("upload failed")
    }
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail ">
          <Form.Label>Search Employee</Form.Label>
          <Form.Control value={searchQuery}
            onChange={handleSearch} type="text" placeholder="Enter name" className='w-3/6' />
          <Form.Text

            className="text-muted">
            bạn sẽ tìm thấy nhân viên theo tên ở đây
          </Form.Text>
        </Form.Group>
      </Form>

      <button
        onClick={xemnhanviendanghi}
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">

        {nghi && (
          <>Xem nhân viên đã nghỉ!</>
        )}
        {nghi === false && (
          <>Xem nhân viên</>
        )}
      </button>

      {Cookies.get('role') === 'OWNER' &&
        <div className="flex mt-4 items-center space-x-2">
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
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-left font-light">
                <thead
                  class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    <th scope="col" class="px-6 py-4">Số điện thoại</th>
                    <th scope="col" class="px-6 py-4">Họ và tên</th>
                    <th scope="col" class="px-6 py-4">Email</th>
                    <th scope="col" class="px-6 py-4">Chức vụ</th>
                    <Button to={config.routes.FormAddEmployee} scope="col" class="px-6 py-4 inline-block rounded bg-primary px-6 pb-2 pt-2.5 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                      Add Employee
                    </Button>
                  </tr>
                </thead>
                <tbody>
                  {employees_
                    .filter(employee => employee.status === nghi) // Filter by employee.status
                    .map((employee, index) => (
                      <tr key={index} class="border-b bg-neutral-100 dark:border-neutral-500 ">
                        <td class="whitespace-nowrap px-6 py-4 font-medium">{employee.mobile}</td>
                        <td class="whitespace-nowrap px-6 py-4">{employee.firstname + employee.lastname}</td>
                        <td class="whitespace-nowrap px-6 py-4">{employee.email}</td>
                        <td class="whitespace-nowrap px-6 py-4">{employee.role}</td>
                        <td class="whitespace-nowrap px-6 py-4">
                          <button
                            onClick={() => xemchitiet(employee.mobile)}
                            type="button" class="mr-2 bg-green-500 hover-bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover-border-blue-500 rounded">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                              <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => chinhsua(employee.mobile)}
                            type="button" class="mr-2 bg-yellow-500 hover-bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover-border-blue-500 rounded">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                              <path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path>
                            </svg>
                          </button>
                          {nghi && Cookies.get('role') === 'owner' && (
                            <button
                              onClick={() => handleDelete(employee.mobile)}
                              type="button" class="mr-2 bg-red-500 hover-bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover-border-blue-500 rounded">
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                              </svg>
                            </button>
                          )}

                        </td>
                      </tr>
                    ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>



      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Company Modal"
        style={customStyles}
      >
        <h2>Bạn có chắc cho nhân viên này nghỉ việc?</h2>
        <div>
          <button onClick={handleConfirmDelete} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg   px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
          <button onClick={closeDeleteModal} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2">Cancel</button>
        </div>
      </Modal>





    </div>

  );
}

export default MembersTable;