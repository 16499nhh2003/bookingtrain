import { instance as axiosClient } from "../axiosConfig";

import { instance2 as axiosClient2 } from "../axiosConfig";

const ApiCar = {
    getlist: (page, limit) => {
        limit = limit || 5
        const url = `/api/car/all?page=${page}&limit=${limit}`;
        return axiosClient.get(url);
    },
    getone: (id) => {
        const url = `/api/typecar/${id}`;
        return axiosClient.get(url);
    },

    addone: (formData) => {
        const url = `/api/car`;
        return axiosClient2.post(url, formData);
    },
    update: (id, formData) => {
        const url = `/api/car/${id}`;
        return axiosClient.put(url, formData);
    },
    deleteOne: (id) => {
        const url = `/api/car/${id}`
        return axiosClient.delete(url);
    },
    getByCompany: (phonecompany) => {
        const url = `/api/car/company/${phonecompany}`
        return axiosClient.get(url);
    },
}

export default ApiCar;