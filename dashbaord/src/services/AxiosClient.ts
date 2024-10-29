import axios from "axios";
import { getLocalStorage } from "../helpers/localStorageManagement";

export const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/api',
})

axiosClient.interceptors.request.use(
    (config) => {
        const token = getLocalStorage('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)