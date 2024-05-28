import { instance as axios } from "../../axiosConfig";
import React, { useEffect, useState } from "react";
import './style.css'


const apiUrl = "https://vietnam-administrative-division-json-server-swart.vercel.app";
const apiEndpointDistrict = apiUrl + "/district/?idProvince=";
const apiEndpointCommune = apiUrl + "/commune/?idDistrict=";

const Location = ({ onLocationChange, location }) => {
    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [communeList, setCommuneList] = useState([]);
    const [districtValue, setDistrictValue] = useState(0);
    const [communeValue, setCommuneValue] = useState(0);
    const [provinceValue, setProvinceValue] = useState(0);
    const [formData, setFormData] = useState({});
    const [comm, setComm] = useState("");

    useEffect(() => {
        setProvinceValue(location?.idProvince)
        setDistrictValue(location?.idDistrict)
        setCommuneValue(location?.idCommune)

        const fetchProvince = async () => {
            let response = await axios.get(apiUrl + "/province");
            setProvinceList(response.data);
        };

        fetchProvince();
    }, [location])

    useEffect(() => {
        // setCommuneList([])
        setFormData((prev) => ({ ...prev, idProvince: provinceValue }))
        const fetchDictrict = async () => {
            if (provinceValue) {
                const districtList = await getDistrict(provinceValue);
                setDistrictList(districtList);
                setCommuneList([])
                // setProvinceValue(idProvice);
                // setFormData(prevFormData => ({ ...prevFormData, idProvice }));
            }
        }
        fetchDictrict()

    }, [provinceValue])

    useEffect(() => {
        const fetchCommune = async () => {
            if (districtValue) {
                const communeList = await getCommune(districtValue);
                setCommuneList(communeList);
                // setFormData(prevFormData => ({ ...prevFormData, idDistrict: value }));
            }
        }
        fetchCommune()

    }, [districtValue])



    const getDistrict = async (idProvince) => {
        const { data: districtList } = await axios.get(
            apiEndpointDistrict + idProvince
        );
        return districtList;
    };

    const getCommune = async (idDistrict) => {
        const { data: communeList } = await axios.get(
            apiEndpointCommune + idDistrict
        );
        return communeList;
    };

    const handleChangeProvince = async (event) => {
        const value = event.target.value;
        if (value === "0") {
            setDistrictList([]);
            setCommuneList([]);
            setDistrictValue("0");
            setCommuneValue("0");
            return;
        }
        const districtList = await getDistrict(value);
        setDistrictList(districtList);
        setProvinceValue(value);
        setFormData(prevFormData => ({ ...prevFormData, idProvince: value }));
    };

    const handleChangeDistrict = async (event) => {
        const value = event.target.value;
        setDistrictValue(value);
        if (value === "0") {
            setCommuneList([]);
            setCommuneValue("0");
        } else {
            const communeList = await getCommune(value);
            setCommuneList(communeList);
            setFormData(prevFormData => ({ ...prevFormData, idDistrict: value }));
        }
    };

    const handleChangeCommune = async (event) => {
        const value = event.target.value;
        setCommuneValue(value);
        let response = await axios.get(`${apiUrl}/commune?idCommune=${value}`);
        const communeName = response.data[0]?.name;
        setComm(communeName);
        setFormData(prevFormData => ({ ...prevFormData, idCommune: value, nameCommune: communeName }));
    };

    useEffect(() => {
        const getProvinceById = async (id) => {
            let response = await axios.get(`${apiUrl}/province?idProvince=${id}`);
            setFormData(prevFormData => ({ ...prevFormData, nameProvince: response.data[0]?.name }));
        };
        getProvinceById(provinceValue);
    }, [provinceValue]);

    useEffect(() => {
        const findDictrictById = async (id) => {
            let response = await axios.get(`${apiUrl}/district?idDistrict=${id}`);
            setFormData(prevFormData => ({ ...prevFormData, nameDistrict: response.data[0]?.name }));
        };
        findDictrictById(districtValue);
    }, [districtValue]);


    useEffect(() => {
        onLocationChange(formData)
    }, [comm])

    return (
        <div className="main-container">
            <div className="select-item">
                <label htmlFor="city-province">Tỉnh/Thành Phố :</label>
                {provinceList.length > 0 && (
                    <select id="city-province" onChange={handleChangeProvince} value={provinceValue}>
                        <option value="0" >&nbsp;Chọn Tỉnh/Thành Phố...</option>
                        {provinceList.map((item, index) => (
                            <option value={item.idProvince} key={index}>&nbsp;{item.name}</option>
                        ))}
                    </select>
                )}
            </div>

            <div
                className="select-item district-town-select"
                onChange={handleChangeDistrict}
            >
                <label htmlFor="district-town">Quận/Huyện :</label>
                <select id="district-town" onChange={() => { }} value={districtValue}>
                    <option value="0">&nbsp;Chọn Quận/Huyện...</option>
                    {districtList.map((district, index) => (
                        <option value={district.idDistrict} key={index} >&nbsp;{district.name}</option>
                    ))}
                </select>
            </div>

            <div className="select-item ward-commune-select">
                <label htmlFor="ward-commune">Xã/Phường :</label>
                <select
                    id="ward-commune"
                    value={communeValue}
                    onChange={handleChangeCommune}
                >
                    <option value="0">&nbsp;Chọn Phường/Xã...</option>
                    {communeList.map((commune, index) => (
                        <option value={commune.idCommune} key={index}>&nbsp;{commune.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Location;
