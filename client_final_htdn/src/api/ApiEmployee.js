import { instance as axiosClient } from "../axiosConfig";


const ApiEmployee = {
    add: (body) => {
        const url = '/api/v1/owner/employees/company';
        return axiosClient.post(url, body);
    },

    getone: (phone) => {
        const url = `/api/v1/owner/employees/${phone}`;
        return axiosClient.get(url);
    },

    getlistbycompany: (phoneCompany) => {
        const url = `/api/v1/owner/employees/company/${phoneCompany}`;
        return axiosClient.get(url);
    },

    deleteEmployee: (phone) => {
        const url = `/api/v1/owner/employees/company/${phone}`;
        return axiosClient.delete(url);
    },
    update: (phone, body) => {
        const url = `/api/v1/owner/employees/company/${phone}`;
        return axiosClient.put(url, body);
    }

}

export default ApiEmployee;