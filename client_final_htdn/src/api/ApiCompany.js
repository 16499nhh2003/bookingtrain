import { instance as axiosClient } from "../axiosConfig";

const ApiCompany = {
    getlist: ({ phone }) => {
        const url = `/api/company/all?phone=${phone}`;
        return axiosClient.get(url);
    },
    getListCompanyActivy: (check) => {
        const url = `/api/company/listcativity/${check}`;
        return axiosClient.get(url);
    },

    addone: (body) => {
        const url = `/api/company`;
        return axiosClient.post(url, body);
    },
    update: (id, body) => {
        const url = `/api/company/${id}`;
        return axiosClient.put(url, body);
    },

    getCompanyByUser: (mobile) => {
        const url = `/api/company/user?mobile=${mobile}`
        return axiosClient.get(url)
    },

    deleteCompany: (phone) => {
        const url = `/api/company/${phone}`
        return axiosClient.delete(url)
    }
}

export default ApiCompany;