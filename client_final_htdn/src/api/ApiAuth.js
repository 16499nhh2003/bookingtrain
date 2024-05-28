import axiosClient1 from "../axiosConfig";

const ApiAuth = {
    register: (body) => {
        const url = '/api/user/register';
        return axiosClient1.post(url, body);
    },
    authenticatePhone: (body) => {

        const url = '/api/user/loginphone';
        return axiosClient1.post(url, body);
    },
    refreshtoken: () => {
        const url = '/api/v1/auth/refresh-token';
        return axiosClient1.post(url);
    },
    logout: () => {
        const url = '/api/v1/auth/logout';
        return axiosClient1.get(url);
    },
    updateUser: (phone, formdata) => {
        const url = `/api/user/phone/${phone}`;;
        return axiosClient1.put(url, formdata);
    },
    changePassword: (mobile, passwordnew, passwordold) => {
        const url = `/api/user/changepassword/${mobile}?newPassword=${passwordnew}&oldPassword=${passwordold}`;
        return axiosClient1.put(url);
    },

    getOne: (phone) => {
        const url = `/api/user/phone/${phone}`;
        return axiosClient1.get(url);
    },

    forgotPass: (email) => {
        const url = `/api/user/forgotpassword?email=${email}`;
        return axiosClient1.post(url);
    },
    verify: (body) => {
        const url = `/api/user/register/verify`
        return axiosClient1.post(url, body);
    }
}

export default ApiAuth;