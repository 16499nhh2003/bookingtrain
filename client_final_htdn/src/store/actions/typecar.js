import actionTypes from './actionTypes'
import { ApicreateTypeCar } from '../../services/typecar'

export const createTypeCar = (payload) => async (dispatch) => {
    try {
        const response = await ApicreateTypeCar(payload);
        dispatch({
            type: actionTypes.CREATE_TYPECAR_SUCCESS,
            data: response.data.token || null
        });
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_TYPECAR_FAILURE,
            data: error.response ? error.response.data.msg : null
        });
    }
}