import React, { useState, useRef, useEffect } from 'react';
import { ApiCompany, ApiDropoff, ApiPickUp, ApiTrip } from '../../../../api';
import './style.css';
import { Location } from '../../../../components';
import { path, swal } from '../../../../utils/constanst'
import { useNavigate } from "react-router-dom"
import { Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'



const AddFrom = () => {
    const navigate = useNavigate();
    const [formData, setformData] = useState({
        pickUpTime: new Date().toISOString().slice(0, 16),
        dropOffTime: new Date().toISOString().slice(0, 16),
        price: 0,
        image: '',
        pickUpLocation: {},
        dropOffLocation: {},
        phoneCompany: ""
    })

    const [pickUpTime, setPickUpTime] = useState(new Date().toISOString().slice(0, 16));
    const [dropOffTime, setDropOffTime] = useState(new Date().toISOString().slice(0, 16));
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [pickUpLocation, setPickUpLocation] = new useState({});
    const [dropOffLocation, setDropOffLocation] = new useState({});
    const [pickuplocation, setPickUplocation] = new useState("");
    const [dropofflocation, setDropOfflocation] = new useState("");
    const [phoneCompany, setPhoneCompany] = useState("");
    const fileInputRef = useRef(null);

    const handlePickUpTimeChange = (event) => {
        const selectedDate = new Date(event.target.value);
        const currentDate = new Date();
        if (selectedDate > currentDate) {
            setPickUpTime(event.target.value);
        }
        else {
            swal('Selected date must be greater than current date', 'error')
        }
    };

    const handleDropOffTimeChange = (event) => {
        const selectedDate1 = new Date(event.target.value);
        if (selectedDate1 < new Date(pickUpTime)) {
            swal('Please choose an appropriate time', 'error')
        }
        else {
            setDropOffTime(event.target.value);
        }
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
        setformData(prev => ({ ...prev, price }));
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
        setformData(prev => ({ ...prev, image: selectedImage }));

        if (selectedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            let company = await ApiCompany.getlist({ phone: phoneCompany })
            if (!company.data.companies) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Không tìm thấy công ty",
                    // footer: '<a href="#">Why do I have this issue?</a>'
                });
            }
            let idCompany = company.data.companies._id
            // console.log(idCompany)
            formData.idCompany = idCompany;

            let response = await ApiDropoff.getDropoff(formData.dropOffLocation);
            if (response) {
                if (response.data.code === 404) {
                    let newDropoff = await ApiDropoff.addone(formData.dropOffLocation);
                    if (newDropoff) {
                        let _id = newDropoff.data.data._id;
                        setDropOfflocation(_id);
                    }
                }
                else if (response.data.code === 200) {
                    let _id = response.data.data._id;
                    setDropOfflocation(_id);
                }
            }

            let response1 = await ApiPickUp.getPickUp(formData.pickUpLocation);
            if (response1) {
                if (response1.data.code === 404) {
                    let newDropoff = await ApiPickUp.addone(formData.pickUpLocation);
                    if (newDropoff) {
                        let _id = newDropoff.data.data._id;
                        setPickUplocation(_id);
                    }
                }
                else if (response1.data.code === 200) {
                    let _id = response1.data.data._id;
                    setPickUplocation(_id);
                }
            }

            console.log(formData)
            return
            const createTrips = await ApiTrip.addone(formData);
            if (createTrips) {
                if (createTrips.status === 200) {
                    swal('Success', 'success')
                    navigate(`/he-thong/${path.MANAGEMENT_TRIP}`)
                }
                else {
                    swal('Error!!!!', 'error')
                }
            }
        } catch (error) {
            console.error(error)
        }
    };

    const onLocationChangeStart = async (data) => {
        setPickUpLocation(data)
    }
    const onLocationChangeEnd = async (data) => {
        setDropOffLocation(data)
    }

    useEffect(() => {
        setformData(pre => ({ ...pre, pickUpTime, dropOffTime, price, image, dropOffLocation, pickUpLocation, dropofflocation, pickuplocation }))
    }, [pickUpTime, dropOffTime, price, image, dropOffLocation, pickUpLocation, dropofflocation, pickuplocation])


    const handleChangeCompany = (event) => {
        let value = event.target.value;
        setPhoneCompany(value)
    }

    return (
        <div>
            <div>Thêm mới một chuyến xe</div>
            <div className="location-container">
                <div className="location">
                    <h3>Điểm xuất phát</h3>
                    <Location onLocationChange={onLocationChangeStart} />
                </div>
                <div className="location">
                    <h3>Điểm đến</h3>
                    <Location onLocationChange={onLocationChangeEnd} />
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="pickUpTime">Thời gian xuất phát:</label>
                    <input
                        type="datetime-local"
                        id="pickUpTime"
                        name="pickUpTime"
                        value={pickUpTime}
                        onChange={handlePickUpTimeChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dropOffTime">Thời gian đến:</label>
                    <input
                        type="datetime-local"
                        id="dropOffTime"
                        name="dropOffTime"
                        value={dropOffTime}
                        onChange={handleDropOffTimeChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Giá:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={price}
                        onChange={handlePriceChange}
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="routeBanner">Banner Image for the Route:</label>
                    <input
                        type="file"
                        id="routeBanner"
                        name="routeBanner"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    <button type="button" onClick={handleButtonClick}>
                        Choose Image
                    </button>
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: '150px', marginTop: '10px' }}
                        />
                    )}
                </div> */}
                <Form.Label htmlFor="inputPassword5">Phone Company</Form.Label>
                <Form.Control
                    type="text"
                    id=""
                    aria-describedby="passwordHelpBlock"
                    value={phoneCompany}
                    onChange={handleChangeCompany}
                />
                <div>
                    <Button variant="outline-primary" type='submit' className='mt-3'>Submit</Button>
                </div>
                {/* <buttontton type="submit">Submit</buttontton> */}
            </form>
        </div>
    );
}

export default AddFrom;
