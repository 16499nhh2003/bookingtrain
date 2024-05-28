import axiosConfig from '../../axiosConfig'
import * as types from '../constants/actionTypes';

export const createTrip = (data) => (dispatch) => {
    return axiosConfig.post('/api/trip', data)
        .then((res) => {
            dispatch({
                type: types.CREATE_TRIP,
                payload: res.data,
            });
            Promise.resolve(res.data);
        })
        .catch((err) => Promise.reject(err));
};

export const getTrips = () => (dispatch) => {
    return axiosConfig.get('/api/trip/all') 
        .then((res) => {
            dispatch({
                type: types.GET_TRIPS,
                payload: res.data,
            });
            Promise.resolve(res.data);
        })
        .catch(error => {
            console.error('Error fetching trips:', error);
            return Promise.reject(error);
        });
};
export const updateTrip = (id, data) => (dispatch) => {
    return axiosConfig
        .put(`/api/trip/${id}`, data)
        .then((res) => {
            dispatch({
                type: types.UPDATE_TRIP,
                payload: res.data,
            });
            Promise.resolve(res.data);
        })
        .catch(console.log());
};


export const deleteTrip = (_id) => (dispatch) => {
    axiosConfig.delete(`/trip/${_id}`).then((res) => {
        dispatch({
            type: types.DELETE_TRIP,
            payload: _id,
        });
    });
};