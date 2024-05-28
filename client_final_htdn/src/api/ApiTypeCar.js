import { instance as axiosClient } from "../axiosConfig";

const ApiTypeCar = {
    getlist: ({page , limit}) => {
        const url = `/api/typecar/types/page?page=${page}&limit=${limit}`;
        return axiosClient.get(url);
    },
    getone: (id) => {
        const url = `/api/typecar/type/${id}`;
        return axiosClient.get(url);
    },

    addone: (body) => {
        const url = `/api/typecar`;
        return axiosClient.post(url, body);
    },
    update: (id, body) => {
        const url = `/api/typecar/${id}`;
        return axiosClient.put(url, body);
    },
    getAll : () => {
        const url = `/api/typecar/types`;
        return axiosClient.get(url)
    }
}

export default ApiTypeCar;