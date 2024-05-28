import axiosConfig from '../../axiosConfig'
import * as types from '../constants/actionTypes';

export const createStation = (data) => (dispatch) => {
    return axiosConfig.post('/api/stations', data)
        .then((res) => {
            dispatch({
                type: types.CREATE_STATION,
                payload: res.data,
            });
            Promise.resolve(res.data);
        })
        .catch((err) => Promise.reject(err));
};

export const getStations = () => (dispatch) => {
    return axiosConfig.get('/api/stations')
        .then((res) => {
            dispatch({
                type: types.GET_STATIONS,
                payload: res.data,
            });
            Promise.resolve(res.data);
        })
        .catch(console.log());
};

export const updateStation = (id, data) => (dispatch) => {
    return axiosConfig
        .patch(`/api/stations/${id}`, data)
        .then((res) => {
            dispatch({
                type: types.UPDATE_STATION,
                payload: res.data,
            });
            Promise.resolve(res.data);
        })
        .catch((err) => Promise.reject(err));
};

export const deleteStation = (_id) => (dispatch) => {
    axiosConfig
        .delete(`/api/stations/${_id}`)
        .then((res) => {
            dispatch({
                type: types.DELETE_STATION,
                payload: _id,
            });
        })
        .catch(console.log());
};