import { instance as axiosClient } from "../axiosConfig";

const ApiDriverTrip = {
    getone: (id) => {
        const url = `/api/drivertrip/info/${id}`;
        return axiosClient.get(url);
    },
    addone: (body) => {
        const url = `/api/drivertrip`;
        return axiosClient.post(url, body);
    },
    editone: (id, body) => {
        const url = `/api/drivertrip/${id}`;
        return axiosClient.put(url, body);
    },
    getlistDriverForCompany: (role, phonecompany) => {
        const url = `/api/driverTrip/employees?phoneCompany=${phonecompany}&role=${role}`;
        return axiosClient.get(url);
    },

    getlistByIDTRIP: (idtrip) => {
        const url = `/api/drivertrip/listbytrip?idtrip=${idtrip}`;
        return axiosClient.get(url);
    },
    getlistBYDATEANDTRIP: (date, idtrip) => {
        const url = `/api/drivertrip/listbytripanddate?idtrip=${idtrip}&date=${date}`;
        return axiosClient.get(url);
    },
    getlistByDATE: (phonecompany, date) => {
        const url = `/api/drivertrip/listbydate?phoneCompany=${phonecompany}&date=${date}`;
        return axiosClient.get(url);
    },

    getlistDriverTripAfterDate: (date, phonecompany) => {
        const url = `/api/drivertrip/listbydategrate?phoneCompany=${phonecompany}&date=${date}`;
        return axiosClient.get(url);
    },
    // deleteById: (id) => {
    //     const url = `/api/v1/staff/drivertrip?id=${id}`;
    //     return axiosClient.delete(url);
    // },
    getlistDriverTripAfterDateANDTRIP: (date, idtrip) => {
        const url = `api/drivertrip/listbyIDTRIPandAfterDate?idtrip=${idtrip}&date=${date}`;
        return axiosClient.get(url);
    },

    getByDateLocateAll: (locatestart, locateend, date) => {
        const url = `/api/drivertrip/search?locatestart=${locatestart}&locateend=${locateend}&date=${date}`;
        return axiosClient.get(url);
    },
    // addAutomatic: (body) => {
    //     const url = `/api/v1/staff/addListBetweenDay`;
    //     return axiosClient.post(url, body);
    // },
    postpromotion: (body) => {
        const url = `/api/v1/staff/promotion`;
        return axiosClient.post(url, body);
    },
    getPromotionList: (phonecomapany) => {
        const url = `/api/v1/staff/promotion/company/${phonecomapany}`;
        return axiosClient.get(url);
    }
}

export default ApiDriverTrip;