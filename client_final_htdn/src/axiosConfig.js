import axios from "axios";
import Cookies from 'js-cookie';


export const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL, 
    headers: {
        'Content-Type': 'application/json'
    }
})

export const instance2 = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL, 
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // let token = window.localStorage.getItem('persist:auth') && JSON.parse(window.localStorage.getItem('persist:auth'))?.token?.slice(1, -1)
    // config.headers = {
    //     authorization: token ? `Bearer ${token}` : null
    // }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance