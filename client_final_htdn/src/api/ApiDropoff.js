import { instance as axiosClient } from "../axiosConfig";

const ApiDropOff = {
    getDropoff: ({idProvince, idDistrict, idCommune}) => {
        const url = `/api/dropoff?idProvince=${idProvince}&idDistrict=${idDistrict}&idCommune=${idCommune}`;
        return axiosClient.get(url);
    },
    addone: (body) => {
        const url = `/api/dropoff`;
        return axiosClient.post(url, body);
    },
}

export default ApiDropOff;