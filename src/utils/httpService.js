import axios from "axios";

axios.interceptors.request.use(
    config => {
        const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const request = {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
};

export default request;
