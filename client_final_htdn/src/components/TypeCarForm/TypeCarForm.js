import React, { useEffect, useState } from 'react';
import { InputForm, Button } from '..';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from "../../store/actions"
import axios from 'axios';
import ApiTypeCar from '../../api/ApiTypeCar';
import {Form} from 'react-bootstrap';
const TypeCarForm = ({ id, handleCloseModal, handleSuccessAdd, handleSuccessUpdate }) => {
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        type_name: '',
        description: '',
        number_seat: 0,
        isHide: false
    });
    const [invalidFields, setInvalidFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (payload.type_name === '' || payload.description === '' || payload.number_seat === 0) {
            setInvalidFields(['type_name', 'description', 'number_seat']);
            return;
        }

        try {
            if (!id) {
                await ApiTypeCar.addone(payload);

                setPayload({
                    type_name: '',
                    description: '',
                    number_seat: 0,
                    isHide: false
                });
                setInvalidFields([]);
                handleSuccessAdd()
            }
            else {
                await ApiTypeCar.update(id, payload)
                setInvalidFields([])
                handleSuccessUpdate()
            }

        } catch (error) {
            // Handle errors here
            console.error('Error adding car type:', error);
            alert('Failed to add car type. Please try again later.' + error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ApiTypeCar.getone(id);
                if (res?.status === 200 && res?.data) {
                    setPayload(res?.data.typeCarData)
                }
            } catch (error) {
                console.error('Error fetching car type:', error);
            }
        };

        id && fetchData();
        return () => { }
    }, [])


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <InputForm
                    className="w-full"
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    label="Type Name"
                    value={payload.type_name}
                    setValue={setPayload}
                    keyField="type_name"
                />
                <InputForm
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    label="Description"
                    value={payload.description}
                    setValue={setPayload} keyField="description"
                />
                <InputForm
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    label="Number of Seats"
                    value={payload.number_seat}
                    setValue={setPayload} keyField="number_seat"
                />
                {!id && (
                    <div className='flex items-center gap-1'>
                        <Button
                            text={'Add'}
                            onClick={handleSubmit}
                            bgColor="bg-secondary1"
                            fullWidth
                            textColor="text-white">
                        </Button>
                        <Button
                            text={'Close'}
                            onClick={handleCloseModal}
                            bgColor="bg-secondary1"
                            fullWidth
                            textColor="text-white">
                        </Button>
                    </div>
                )}
                {id && (
                    <div className='flex items-center gap-1'>
                        <Button
                            text={'Update'}
                            onClick={handleSubmit}
                            bgColor="bg-secondary1"
                            fullWidth
                            textColor="text-white">
                        </Button>
                        <Button
                            text={'Close'}
                            onClick={handleCloseModal}
                            bgColor="bg-secondary1"
                            fullWidth
                            textColor="text-white">
                        </Button>
                    </div>
                )}

            </form>
        </div>
    );
};

export default TypeCarForm;
