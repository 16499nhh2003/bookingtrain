import React, { useState, useEffect, useCallback } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiCar from '../../../api/ApiCar';
import { InputForm1, Button, TypeCarForm, Modal, Car } from '../../../components';
import Pagination from '../../../components/Pagination/Pagination'
import { CarList, AddCarModal } from './index'
import { showToast } from '../../../utils/constanst'

const ManageCar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cars, setCars] = useState([])
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchCars();
    }, [currentPage])

    const handleAddCar = async (data) => {
        try {
            const formData = new FormData();
            // for (const image of data.images) {
            //     formData.append('images', data.images);
            // }

            for (let key in data) {
                if (key !== 'images') {
                    formData.append(key, data[key])
                }
            }
            const response = await ApiCar.addone(formData);
            if (response) {
                setIsAddModalOpen(false);
                showToast('Car added successfully', 'success');
                fetchCars();
            }
        } catch (error) {
            console.error('Failed to add car:', error);
            showToast('Failed to add car. Please try again later', 'error');
        }
    };

    const fetchCars = async () => {
        try {
            const response = await ApiCar.getlist(currentPage);
            if (!response) toast.error('Failed to fetch car types. Please try again later.');
            setCars(response?.data.Cars.data)
            setTotalPages(response?.data.Cars.metadata.totalPages);
        } catch (error) {
            toast.error('Failed to fetch car types. Please try again later.');
        }
    };

    const handleEditCar = async (_id, data) => {
        try {

            console.log(data)
            const formData = new FormData();

            for (const image of data.images) {
                formData.append('images', image);
            }

            for (let key in data) {
                if (key !== 'images') {
                    formData.append(key, data[key])
                }
            }
            const response = await ApiCar.update(_id, formData)
            if (response) {
                console.log(response)
            }
            showToast('Car updated successfully', 'success');
        } catch (error) {
            console.error(error)
            toast.error('Failed to fetch handleEditCar types. Please try again later.');
        }
    }

    const handleDelete = async (_id) => {
        try {
            const response = await ApiCar.deleteOne(_id)
            if (response) {
                showToast('Car updated successfully', 'success');
                fetchCars()
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to fetch handleDelete types. Please try again later.');
        }
    }

    return (
        <div className="p-4">
            <div
                className='flex items-start gap-1'
            >
                <InputForm1
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search cars..."
                    onEnter={() => { }}
                    className="mb-4"
                />

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white text-sm font-medium py-2 px-4 rounded-md shadow-sm"
                >
                    Add Car
                </button>

            </div>

            <CarList data={cars} className="mt-4" onEdit={handleEditCar} onDelete={handleDelete} />

            <AddCarModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddCar}
            />
            <ToastContainer />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => { setCurrentPage(page) }} />

        </div>
    )
}
export default ManageCar
