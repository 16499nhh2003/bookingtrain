import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import { persistReducer } from "redux-persist";
import { useReducer } from "react";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import userReducer from "./userReducer";
import typeCarReducer from './typecarRecuder'
import stations from './stationsReducer'
import tripReducer from './tripReducer'


const commitConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commitConfig,
    key: 'auth',
    whitelist: ['isLoggedIn', 'token', '_id']
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    typecar: typeCarReducer,
    user: userReducer,
    stations,
    trips: tripReducer

})

export default rootReducer  