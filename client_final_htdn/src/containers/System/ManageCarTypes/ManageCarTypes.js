import React, { useState, useEffect } from 'react';
import ApiTypeCar from '../../../api/ApiTypeCar';
import { InputForm, Button, TypeCarForm, SearchInput, SearchButton } from '../../../components';
import Pagination from '../../../components/Pagination/Pagination'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageCarTypes = () => {
    const [carTypes, setCarTypes] = useState([]);
    const [selectedCarType, setSelectedCarType] = useState(null);
    const [invalidFields, setInvalidFields] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [showAdd, setShowAdd] = useState(false)
    const [payload, setPayload] = useState({
        type_name: '',
        description: '',
        number_seat: 0,
        isHide: false
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const notifySuccess = (msg) => toast.success(`${msg}`);
    const notifyError = (msg) => toast.error(`${msg}`);

    const fetchData = async () => {
        try {
            const response = await ApiTypeCar.getlist({ page: currentPage, limit: 5 });
            setCarTypes(response?.data.typeCars.data);
            setTotalPages(response?.data.typeCars.metadata.totalPages);
        } catch (error) {
            notifyError(`Failed to add car type. Please try again later.`)
        }
    };

    useEffect(() => {
        fetchData();
        return () => { }
    }, [currentPage]);


    const handleModal = (carType) => {
        setSelectedCarType(carType);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        showModal && setShowModal(false);
        showModalUpdate && setShowModalUpdate(false);
        showAdd && setShowAdd(false)
    };

    const handleModalUpdate = (carType) => {
        setPayload(carType)
        setSelectedCarType(carType)
        setShowModalUpdate(true)
    }

    const handleSuccessAdd = () => {
        fetchData()
        setShowAdd(false)
        notifySuccess('Car type added successfully!')
    }

    const handleSuccessUpdate = () => {
        fetchData()
        setShowModalUpdate(false)
        notifySuccess('Car type updated successfully!')
    }


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDeleteConfirmation = async (carType1) => {
        await deleteModel(carType1._id)
        setShowDeleteConfirmation(false);
    };

    const deleteModel = async (id) => {
        const response = await ApiTypeCar.update(id, { isHide: true })
    }

    const handleSearch = () => {
        const filteredCarTypes = carTypes.filter(carType =>
            carType.type_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            carType.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setCarTypes(filteredCarTypes);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        fetchData();
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Car Types</h2>
            <div className="mb-4 flex gap-2">
                <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <SearchButton onClick={handleSearch} label="Search" />
                <SearchButton onClick={handleClearSearch} label="Clear" />
            </div>
            <button
                className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => { setShowAdd(true) }}
            >
                Add New Car Type
            </button>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">Type Name</th>
                        <th className="px-6 py-3 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">Number of Seats</th>
                        <th className="px-6 py-3 bg-gray-100"></th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {carTypes.filter(item => !item.isHide).map(carType => (
                        <tr key={carType._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-no-wrap">{carType.type_name}</td>
                            <td className="px-6 py-4 whitespace-no-wrap">{carType.description}</td>
                            <td className="px-6 py-4 whitespace-no-wrap">{carType.number_seat}</td>
                            <td className="px-6 py-4 whitespace-no-wrap gap-2 flex">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleModal(carType)}>View Details</button>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleModalUpdate(carType)}>Update</button>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                        setShowDeleteConfirmation(true)
                                        setSelectedCarType(carType)
                                    }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />


            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
                        <div className="bg-gray-100 px-6 py-8 sm:px-8 sm:py-10">
                            <div className="flex justify-end">
                                <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={() => { setShowModal(false) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>

                                </button>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Car Type Details</h3>
                                {selectedCarType && (
                                    <div className="text-left">
                                        <p className="text-gray-800 mb-2"><span className="font-semibold">Type Name:</span> {selectedCarType.type_name}</p>
                                        <p className="text-gray-800 mb-2"><span className="font-semibold">Description:</span> {selectedCarType.description}</p>
                                        <p className="text-gray-800"><span className="font-semibold">Number of Seats:</span> {selectedCarType.number_seat}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            )}

            {showModalUpdate && (<div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Update Car Type</h3>
                                {selectedCarType && (<TypeCarForm
                                    id={selectedCarType._id}
                                    handleCloseModal={handleCloseModal}
                                    handleSuccessUpdate={handleSuccessUpdate} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}


            {showAdd && (<div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Thêm loại xe</h3>
                                {selectedCarType && (
                                    <div>
                                        <TypeCarForm
                                            handleCloseModal={handleCloseModal}
                                            handleSuccessAdd={handleSuccessAdd}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}



            {showDeleteConfirmation && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white w-1/3 p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold mb-4">Confirmation</h2>
                        <p>Are you sure you want to delete : {selectedCarType.type_name}?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={() => { handleDeleteConfirmation(selectedCarType) }}
                            >
                                Confirm
                            </button>
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setShowDeleteConfirmation(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}

export default ManageCarTypes;
