import React, { useState, useRef, useEffect } from 'react';
import { ApiDropoff, ApiPickUp, ApiTrip ,ApiCompany } from '../../../../api';
import './style.css';
import { Location } from '../../../../components';
import { path, swal } from '../../../../utils/constanst'
import { useNavigate, useParams } from "react-router-dom"
import { Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'


const EditForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setformData] = useState({
        pickUpTime: new Date().toISOString().slice(0, 16),
        dropOffTime: new Date().toISOString().slice(0, 16),
        price: 0,
        image: '',
        pickUpLocation: {},
        dropOffLocation: {}
    })

    const [selectedTrip, setSelectedTrip] = useState({})
    const [pickUpTime, setPickUpTime] = useState(new Date().toISOString().slice(0, 16));
    const [dropOffTime, setDropOffTime] = useState(new Date().toISOString().slice(0, 16));
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [pickUpLocation, setPickUpLocation] = new useState({});
    const [dropOffLocation, setDropOffLocation] = new useState({});
    const fileInputRef = useRef(null);
    const [phoneCompany, setPhoneCompany] = useState("");


    useEffect(() => {
        const fetchTrip = async (id) => {
            let res = await ApiTrip.getone(id);
            if (res.status === 200) {
                setSelectedTrip(res.data.tripData)
            }
        }
        fetchTrip(id)
    }, [id])

    useEffect(() => {
        // console.log(selectedTrip)
        if (selectedTrip.pickUpTime) {
            setPickUpTime(selectedTrip.pickUpTime.slice(0, 16))
        }
        if (selectedTrip.dropOffTime) {
            setDropOffTime(selectedTrip.dropOffTime.slice(0, 16))
        }
        if (selectedTrip.price) {
            setPrice(selectedTrip.price)
        }
        if (selectedTrip.dropofflocation) {
            setDropOffLocation(selectedTrip.dropofflocation)
        }
        if (selectedTrip.pickuplocation) {
            setPickUpLocation(selectedTrip.pickuplocation)
        }
        if (selectedTrip.idCompany) {
            setPhoneCompany(selectedTrip.idCompany.phone)
        }
    }, [selectedTrip])

    useEffect(() => {
        setformData(prev => ({ ...prev, pickUpTime }))
    }, [pickUpTime])

    useEffect(() => {
        setformData(prev => ({ ...prev, dropOffTime }))
    }, [dropOffTime])

    useEffect(() => {
        setformData(prev => ({ ...prev, price }))
    }, [price])

    useEffect(() => {
        setformData(prev => ({ ...prev, pickUpLocation }))
    }, [pickUpLocation])

    useEffect(() => {
        setformData(prev => ({ ...prev, dropOffLocation }))
    }, [dropOffLocation])

    const handlePickUpTimeChange = (event) => {
        const selectedDate = new Date(event.target.value);
        selectedDate > new Date() ? setPickUpTime(selectedDate) : swal('Selected date must be greater than current date', 'error')
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
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (event) => {
        // const selectedImage = event.target.files[0];
        // setImage(selectedImage);
        // setformData(prev => ({ ...prev, image: selectedImage }));

        // if (selectedImage) {
        //     const reader = new FileReader();
        //     reader.onloadend = () => {
        //         setImagePreview(reader.result);
        //     };
        //     reader.readAsDataURL(selectedImage);
        // } else {
        //     setImagePreview(null);
        // }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            let company = await ApiCompany.getlist({ phone: phoneCompany })
            if (!company.data.companies) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Không tìm thấy công ty",
                    // footer: '<a href="#">Why do I have this issue?</a>'
                });
                return 
            }
            let idCompany = company.data.companies._id

            let response1 = await ApiPickUp.getPickUp(formData.pickUpLocation);
            if (response1) {
                if (response1.data.code === 404) {
                    console.log(formData.pickUpLocation)
                    let newDropoff = await ApiPickUp.addone(formData.pickUpLocation);
                    if (newDropoff) {
                        let _id = newDropoff.data.data._id;
                        formData.pickuplocation = _id
                    }
                }
                else if (response1.data.code === 200) {
                    let _id = response1.data.data._id;
                    // setPickUplocation(_id);
                    formData.pickuplocation = _id;
                }
            }
            // console.log(formData)
            let response = await ApiDropoff.getDropoff(formData.dropOffLocation);
            if (response) {
                if (response.data.code === 404) {
                    let newDropoff = await ApiDropoff.addone(formData.dropOffLocation);
                    if (newDropoff) {
                        let _id = newDropoff.data.data._id;
                        // setDropOfflocation(_id);
                        formData.dropofflocation = _id;
                    }
                }
                else if (response.data.code === 200) {
                    let _id = response.data.data._id;
                    // setDropOfflocation(_id);
                    formData.dropofflocation = _id;
                }
            }
            const createTrips = await ApiTrip.update(id, formData);
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
                    <Location onLocationChange={onLocationChangeStart} location={pickUpLocation} />
                </div>
                <div className="location">
                    <h3>Điểm đến</h3>
                    <Location onLocationChange={onLocationChangeEnd} location={dropOffLocation} />
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
                    )
                    }
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
            </form>
        </div>
    );
}

export default EditForm;
