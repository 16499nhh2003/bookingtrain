import { Container, Row, Col } from "react-bootstrap";
import InfoTrip from "../../../components/InfoTrip";
import Search from "../Home/Hero/Hero";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import DriverTripAPI from '../../../api/ApiDriverTrip';
function ListInfoTrip() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const handleClickSearch = () => {

        fectdatagetDriverTripByDateAndLocateAll();
    };

    const [dateformat, setDateformat] = useState('');
    const [locatestart, setLocatestart] = useState('');
    const [locateend, setLocateend] = useState('');

    useEffect(() => {
        const dateTEMP = searchParams.get('date');
        const split = dateTEMP.split('-');
        const year = split[0];
        const month = split[1];
        const date = split[2];

        const formattedDate = month + "/" + date + "/" + year;
        setDateformat(formattedDate);
        setLocatestart(searchParams.get('locatestart') || '');
        setLocateend(searchParams.get('locateend') || '');
    }, [location.search]);



    const [selectedOption, setSelectedOption] = useState('1');
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        // console.log(event.target.value);
        let sortedData = [...driverTrips];

        if (event.target.value === '4') {
            sortedData.sort((a, b) => b.trip.price - a.trip.price);
        }
        else if (event.target.value === '5') {
            sortedData.sort((a, b) => a.trip.price - b.trip.price);
        } else if (event.target.value === '2') {
            sortedData.sort((a, b) => compareTime(a.trip.pickUpTime, b.trip.pickUpTime));
        } else if (event.target.value === '3') {
            sortedData.sort((a, b) => compareTime(b.trip.pickUpTime, a.trip.pickUpTime));
        } else if (event.target.value === '1') {
            fectdatagetDriverTripByDateAndLocateAll();
        }
        console.log()
        setDriverTrips(sortedData);
    };

    const compareTime = (time1, time2) => {
        const [hours1, minutes1] = time1.split(':').map(Number);
        const [hours2, minutes2] = time2.split(':').map(Number);

        if (hours1 === hours2) {
            return minutes1 - minutes2;
        }

        return hours1 - hours2;
    };

    const [driverTrips, setDriverTrips] = useState([]);
    const [driverTrips_, setDriverTrips_] = useState([]);
    const [selectedNhaxeOption, setSelectedNhaxeOption] = useState('');

    const [nhaXe, setNhaXe] = useState([])



    const fectdatagetDriverTripByDateAndLocateAll = async () => {
        try {
            const data = await DriverTripAPI.getByDateLocateAll(locatestart, locateend, dateformat);
            setDriverTrips(data.data)
            setDriverTrips_(data.data)
            // for (let i = 0; i < data.data.length; i++) {
            //     const currentItem = data.data[i];
            //     const datatemp = {
            //         phone: currentItem.trip.idCompany.phone,
            //         name: currentItem.trip.idCompany.name
            //     };

            //     console.log(nhaXe)

            //     // Check if the item already exists in the state
            //     const itemExists = nhaXe.some(item => item.phone == datatemp.phone);

            //     if (!itemExists) {
            //         // If the item doesn't exist, update the state
            //         setNhaXe((prevState) => [...prevState, datatemp]);
            //     }
            // }


            // console.log(nhaXe)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fectdatagetDriverTripByDateAndLocateAll();
    }, [locatestart, locateend, dateformat]);

    const handleChangeNhaxe = (event) => {
        const selectedValue = event.target.value;
        setSelectedNhaxeOption(event.target.value);

        let sortedData = [...driverTrips_];
        const selectedItems = sortedData.filter(item => item.trip.phoneCompany.phone === selectedValue);
        setDriverTrips(selectedItems);
    };



    return (
        <Container fluid={true}>
            <Row>
                <Search onSearch={handleClickSearch} />
            </Row>
            <Row className="bg-transparent">
                <Col lg={3}>
                    <div className="p-4 bg-white m-5">
                        <h1 className="fw-bold fs-1">Sắp Xếp</h1>
                        <ul>
                            <li>
                                <input

                                    type='radio'
                                    id='radio1'
                                    value='1'
                                    onChange={handleChange}
                                    checked={selectedOption === '1'}
                                />
                                <label className="ml-2 fs-3" htmlFor='radio1'>Mặc Định</label>
                            </li>
                            <li>
                                <input

                                    type='radio'
                                    id='radio2'
                                    value='2'
                                    onChange={handleChange}
                                    checked={selectedOption === '2'}
                                />
                                <label className="ml-2 fs-3" htmlFor='radio2'>Đi Sớm Nhất</label>
                            </li>
                            <li>
                                <input

                                    type='radio'
                                    id='radio3'
                                    value='3'
                                    onChange={handleChange}
                                    checked={selectedOption === '3'}
                                />
                                <label className="ml-2 fs-3" htmlFor='radio3'>Đi Muộn Nhất</label>
                            </li>
                            {/* Add the rest of your radio buttons here */}
                            <li>
                                <input

                                    type='radio'
                                    id='radio4'
                                    value='4'
                                    onChange={handleChange}
                                    checked={selectedOption === '4'}
                                />
                                <label className="ml-2 fs-3" htmlFor='radio4'>Giá Cao Nhất</label>
                            </li>
                            <li>
                                <input

                                    type='radio'
                                    id='radio5'
                                    value='5'
                                    onChange={handleChange}
                                    checked={selectedOption === '5'}
                                />
                                <label className="ml-2 fs-3" htmlFor='radio5'>Giá Thấp Nhất</label>
                            </li>
                            <li>
                                <input

                                    type='radio'
                                    id='radio6'
                                    value='6'
                                    onChange={handleChange}
                                    checked={selectedOption === '6'}
                                />
                                <label className="ml-2 fs-3" htmlFor='radio6'>Đánh Giá Cao</label>
                            </li>
                        </ul>

                    </div>
                    {/* <div className="p-4 bg-white m-5 ">
                        <h1 className="fw-bold fs-1">tìm theo nhà xe</h1>

                        <ul>
                            {nhaXe.map((item, index) => (
                                <li key={index}>
                                    <input
                                        type='radio'
                                        id={`radioNhaxe${index}`}
                                        value={item.phone}
                                        onChange={handleChangeNhaxe}
                                        checked={selectedNhaxeOption === item.phone}
                                    />
                                    <label className="ml-2 fs-3" htmlFor={`radioNhaxe${index}`}>{item.name}</label>
                                </li>
                            ))}
                        </ul>


                    </div> */}
                </Col>
                <Col lg={8}>

                    {driverTrips.map((driverTrip) => (
                        <div key={driverTrip._id}>
                            <InfoTrip data={driverTrip} />
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

export default ListInfoTrip;