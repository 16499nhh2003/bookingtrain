import { instance as axiosClient } from "../axiosConfig";

const ApiTrip = {
    getlist: (keyword, page, limit ) => {
        keyword = keyword || ''
        page = page || 1;
        limit = limit || 2;
        // console.log(keyword , page , limit)
        const url = `/api/trip/all?keyword=${keyword}&page=${page}&limit=${limit}`;
        return axiosClient.get(url);
    },
    // getlistCompany: (idcompany) => {
    //     const url = `/api/trip/company/${idcompany}`;
    //     return axiosClient.get(url);
    // },
    getone: (id) => {
        const url = `/api/trip/detail/${id}`;
        return axiosClient.get(url);
    },

    addone: (formData) => {
        const url = `/api/trip`;
        return axiosClient.post(url, formData);
    },
    update: (id, formData) => {
        const url = `/api/trip/${id}`;
        return axiosClient.put(url, formData);
    },
    deleteOne: (id) => {
        const url = `/api/trip/${id}`
        return axiosClient.delete(url);
    },

    getListPHONECOMPANY : (phone)  => {
        const url = `/api/trip/company?phone=${phone}`
        return axiosClient.get(url);
    }


}

export default ApiTrip;