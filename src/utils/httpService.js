import axios from "axios";

axios.interceptors.request.use(
    config => {
        // Get the token from your desired source
        const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

        // Add the Authorization header to the request
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
