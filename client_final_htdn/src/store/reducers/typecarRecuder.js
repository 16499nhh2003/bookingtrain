import  actionTypes  from "../actions/actionTypes";

const initialState = {
    loading: false,
    error: null,
    token: null
};

const createTypeCarReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_TYPECAR_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                token: action.data
            };
        case actionTypes.CREATE_TYPECAR_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.data,
                token: null
            };
        default:
            return state;
    }
};

export default createTypeCarReducer;
