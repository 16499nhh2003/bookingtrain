import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import CompanyAPI from '../../../../api/ApiCompany';
import Modal from 'react-modal';
import axios from 'axios';
Modal.setAppElement(document.body);
function Company() {

    const isFormDataValid = () => {
        console.log(formData)
        const { phone, email, name, desc, vnp_TmnCode, vnp_HashSecret } = formData;
        return phone && name && desc && email;
    };


    const [companies, setCompanies] = useState([]);

    // Define an asynchronous function to fetch company data
    const fetchCompanyData = async () => {
        try {
            const data = await CompanyAPI.getListCompanyActivy(true);
            setCompanies(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Call the asynchronous function to fetch data
        fetchCompanyData();
        setCheck(false);
    }, []);

    //


    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        name: '',
        desc: '',
        isStatus: true,
        vnp_TmnCode: '',
        vnp_HashSecret: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name , value)
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAdd_ = async () => {
        console.log(companies)
        setCompanies([...companies, { ...formData }]);

        const regex = /^0\d+/;
        if (regex.test(formData.phone)) {
        } else {
            alert("Số điện thoại phải bắt đầu bằng 0");
            return;
        }

        if (isFormDataValid()) {
            // const jsonData = JSON.stringify(formData);
            // console.log(jsonData)
            try {
                const response = await CompanyAPI.addone(formData);
                setCompanies([...companies, formData]);

                // Xóa dữ liệu trong form
                setFormData({
                    phone: '',
                    email: '',
                    name: '',
                    desc: '',
                    status: true,
                    vnp_TmnCode: '',
                    vnp_HashSecret: '',
                });
            } catch (error) {
                // Xử lý lỗi
                console.error(error)
                alert('Error adding company');
            }

        } else {
            alert("Vui lòng nhập đầy đủ thông tin!");
        }


    };



    const handleAdd = () => {
        // Thêm công ty mới vào danh sách
        // Xóa dữ liệu trong form
        setInputReadOnly(false);

        setFormData({
            phone: '',
            email: '',
            name: '',
            desc: '',
            status: true,
            vnp_TmnCode: '',
            vnp_HashSecret: '',
        });
        setIsEditing(false);
        openModal();
    };

    const handleEdit = (phone) => {
        setInputReadOnly(true);
        // Tìm công ty theo số điện thoại và cập nhật dữ liệu trong form
        const companyToEdit = companies.find((company) => company.phone === phone);
        console.log(companyToEdit)
        if (companyToEdit) {
            setFormData({ ...companyToEdit });
            openModal();
            setIsEditing(true);
        }
    };

    const handleUpdate = async () => {
        console.log(formData)
        // Cập nhật công ty theo số điện thoại và dữ liệu trong form
        if (isFormDataValid()) {
            if (formData.isStatus === 'on') {
                formData.isStatus = true;
            }
            try {
                const formData_ = await CompanyAPI.update(formData._id, formData);
                console.log(formData_);
                //console.log(formData);
                setCompanies((prevCompanies) =>
                    prevCompanies.map((company) =>
                        company.phone === formData.phone ? { ...formData } : company
                    )
                );
                setIsEditing(false);
            } catch (error) {
                console.log(error);
            }

        } else {
            alert("Vui lòng nhập đầy đủ thông tin!");
        }
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

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDelete = (phone) => {
        setPhone(phone)
        openDeleteModal(); // Open the delete confirmation modal
    };



    const [phone, setPhone] = useState('');
    const handleConfirmDelete = async () => {

        try {
            const response = await CompanyAPI.deleteCompany(phone);
            console.log(response);
            setCompanies((prevCompanies) =>
                prevCompanies.filter((company) => company.phone !== phone)
            );

        } catch (error) {
            // Xử lý lỗi
            console.error('Error adding company:', error.response.data);
            alert('Error adding company:' + error.response.data);
        }

        // Proceed with deletion

        closeDeleteModal(); // Close the delete confirmation modal
    };


    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3; // Số lượng mục trên mỗi trang

    // Tính toán số trang
    const pageCount = Math.ceil(companies.length / itemsPerPage);

    // Lấy danh sách Trip cho trang hiện tại
    const currentCompanys = companies.length > 0 ? companies.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : [];

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

    const [check, setCheck] = useState(false);
    const handlenhaxengunghoptac = async () => {
        try {
            const data = await CompanyAPI.getListCompanyActivy(check);
            console.log(data)
            setCheck(!check);
            setCompanies(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [isInputReadOnly, setInputReadOnly] = useState(false);


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
                const response = await axios.post('/api/v2/admin/companies/list', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setCompanies((prevTypecars) => [...prevTypecars, ...response.data]);

                // Handle the response from the server (e.g., display success message or process data)
                console.log('Upload successful:', response.data);
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
    const [userData, setUserData] = useState({});

    const handleReadOwner = async (phone) => {
        console.log(phone);
        try {
            const apiResponse = await CompanyAPI.showowner(phone);
            console.log(apiResponse);
            console.log(typeof (apiResponse))

            const extractedData = {
                phone: apiResponse.phone,
                email: apiResponse.email,
                password: apiResponse.password,
                name: apiResponse.name,
                status: apiResponse.status,
                role: apiResponse.role
            };
            setUserData(extractedData);
            // Handle the response from the server (e.g., display success message or process data)
        } catch (error) {
            // Handle errors (e.g., display error message)
            console.error('Upload failed:', error);
        }
        openOwner();
    }








    return (
        <div>
            <button
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                Thêm Nhà Xe
            </button>

            <button
                onClick={handlenhaxengunghoptac}
                className="ml-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                {check === true && (
                    <p>Các nhà xe đang hợp tác</p>
                )}
                {check === false && (
                    <p>Các nhà xe ngừng hợp tác</p>
                )}
            </button>

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


            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Số điện thoại công ty</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Tên công ty</th>
                        <th className="px-4 py-2">Mô tả công ty</th>
                        <th className="px-4 py-2">Trạng thái hoạt động</th>
                        <th className="px-4 py-2">vnp_TmnCode</th>
                        <th className="px-4 py-2">vnp_HashSecret</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCompanys.map((company, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{company.phone}</td>
                            <td className="border px-4 py-2">{company.email}</td>
                            <td className="border px-4 py-2">{company.name}</td>
                            <td className="border px-4 py-2">{company.desc}</td>
                            <td className="border px-4 py-2">{company.isStatus ? "Hợp tác" : "Ngừng hợp tác"}</td>
                            <td className="border px-4 py-2">{company.vnp_TmnCode}</td>
                            <td className="border px-4 py-2">{company.vnp_HashSecret}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleEdit(company.phone)}
                                    className="bg-blue-500 mb-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full mr-2"
                                >
                                    Edit
                                </button>
                                {
                                    !check &&
                                    <button
                                        onClick={() => handleDelete(company.phone)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
                                    >
                                        Delete
                                    </button>

                                }

                                <button
                                    onClick={() => handleReadOwner(company.phone)}
                                    className="bg-lime-700 hover:bg-lime-400 text-white font-bold py-1 px-2 rounded-full"
                                >
                                    Account nhà xe!
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
                    previousLinkClassName={'page-link bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full '}
                    nextLinkClassName={'page-link bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}
                    pageLinkClassName={'page-link bg-white text-gray-700 hover:bg-gray-200 font-bold py-2 px-4 rounded-full'}
                    activeClassName={'active'}
                    disabledClassName={'disabled'}
                />

            </div>

            {/* START FORM */}
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
                    <h2 className="text-xl font-bold">
                        {isEditing ? 'Edit Company' : 'Add Company'}
                    </h2>
                    <h2 className="text-xl font-bold">Company Form</h2>
                    <div className="mb-2">
                        <label className="block text-gray-700 font-bold mb-2">Phone</label>
                        <input
                            type="text"
                            className="border rounded-lg px-3 py-2 w-full"
                            name="phone"
                            value={formData.phone}
                            readOnly={isInputReadOnly}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 font-bold mb-2">Email</label>
                        <input
                            type="email"
                            className="border rounded-lg px-3 py-2 w-full"
                            name="email"
                            readOnly={isInputReadOnly}
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 font-bold mb-2">Name</label>
                        <input
                            type="text"
                            className="border rounded-lg px-3 py-2 w-full"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 font-bold mb-2">desc</label>
                        <input
                            type="text"
                            className="border rounded-lg px-3 py-2 w-full"
                            name="desc"
                            value={formData.desc}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 font-bold mb-2">status</label>
                        <input
                            type="checkbox"
                            className="border rounded-lg px-3 py-2"
                            name="isStatus"
                            checked={formData.isStatus}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 font-bold mb-2">vnp_TmnCode</label>
                        <input
                            type="text"
                            className="border rounded-lg px-3 py-2 w-full"
                            name="vnp_TmnCode"
                            value={formData.vnp_TmnCode}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 font-bold mb-2">vnp_HashSecret</label>
                        <input
                            type="text"
                            className="border rounded-lg px-3 py-2 w-full"
                            name="vnp_HashSecret"
                            value={formData.vnp_HashSecret}
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
                                onClick={handleAdd_}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                            >
                                Add
                            </button>
                        )}
                        <button
                            onClick={() => {
                                setFormData({
                                    phone: '',
                                    email: '',
                                    name: '',
                                    desc: '',
                                    status: '',
                                    vnp_TmnCode: '',
                                    vnp_HashSecret: '',
                                });
                                setIsEditing(false);
                            }}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                            Clear
                        </button>
                    </div>
                </div>
                {/* END FORM */}
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={closeDeleteModal}
                contentLabel="Delete Company Modal"
                style={customStyles}
            >
                <h2>Are you sure you want to delete this company?</h2>
                <div>
                    <button onClick={handleConfirmDelete} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg   px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
                    <button onClick={closeDeleteModal} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2">Cancel</button>
                </div>
            </Modal>

            <Modal
                isOpen={isOpenModalOwnwer}
                onRequestClose={clodeOwner}
                contentLabel="Owner"
                style={customStyles_}
            >
                <h2>Thông tin account nhà xe</h2>
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
                    <h1 className="text-2xl font-bold mb-4">User Data</h1>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Phone</label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 w-full"
                                value={userData.phone}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Email</label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 w-full"
                                value={userData.email}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Password</label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 w-full"
                                value={userData.password}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Name</label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 w-full"
                                value={userData.name}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Status</label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 w-full"
                                value={userData.status ? "Active" : "Inactive"}
                                readOnly
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Role</label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 w-full"
                                value={userData.role}
                                readOnly
                            />
                        </div>
                    </form>
                </div>
            </Modal>

        </div>
    );
}

export default Company;