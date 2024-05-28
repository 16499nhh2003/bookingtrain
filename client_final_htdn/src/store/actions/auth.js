import actionTypes from './actionTypes'
import { apiLogin, apiRegister } from '../../services/auth'

export const register = (payload) => async (dispatch) => {
    try {
        const response = await apiRegister(payload)
        if (response) {
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data: response.data.token
            })
        }
        else {
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                data: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: null
        })
    }
}

export const login = (payload) => async (dispatch) => {
    try {
        const response = await apiLogin(payload)
        console.log(response)
        if (response?.data.success) {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data.accessToken,
                _id:  response.data.userData._id,
            })
        }
        else {
            dispatch({
                type: actionTypes.LOGIN__FAIL,
                data: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN__FAIL,
            data: null
        })
    }
}

export const logout = () => ({
    type: actionTypes.LOGOUT
})