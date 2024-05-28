import React, { useEffect, useState } from "react";
import AdminCardSection1 from "./sections/AdminCardSection1";
// import TableSection from "./sections/TableSection";
import BreadcrumSection from "./sections/BreadcrumSection";
import ChartSection1 from "./sections/ChartSection1";
import ChartSection2 from "./sections/ChartSection2";
import cookies from 'js-cookie'
import { BookingAPI } from '../../api'
import ChartComponent from "../../components/chart";


const DashboardPage = () => {
    const [data, setData] = useState({})

    useEffect(() => {
        const getData = async (phone) => {
            let response = await BookingAPI.laythongtindoanhthu(phone)
            setData(response.data)
        }
        let dataCompany = JSON.parse(cookies.get('company'))
        let phone = dataCompany.phone
        if (phone) {
            getData(phone)
        }
        return () => {
        }
    }, [])

    return (
        <React.Fragment>
            <BreadcrumSection />
            <AdminCardSection1 data={data} />
            <ChartComponent data={data} />
        </React.Fragment>
    );
};

export default DashboardPage;