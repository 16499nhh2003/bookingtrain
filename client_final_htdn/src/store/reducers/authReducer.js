import actionTypes from "../actions/actionTypes";
const initState = {
    isLoggedIn: false,
    token: null,
    msg: '',
    update: false,
    _id :'',
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data
            }
        case actionTypes.REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                msg: action.data,
                token: null
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data,
                msg: '',
                _id : action._id
            }
        case actionTypes.LOGIN__FAIL:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                msg: action.data,
                update: !state.update
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                msg: ''
            }
        default:
            return state;
    }
}

export default authReducer;