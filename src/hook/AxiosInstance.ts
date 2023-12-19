import axios from "axios";

// Tạo một Axios instance với cấu hình tiêu đề JSON và CORS cho phép bất kỳ nguồn gốc (Allow Any Origin)
export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
    baseURL:'https://webnovelapi.azurewebsites.net/api'
});

export const axiosAuthorizedInstance= axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
    baseURL:'https://webnovelapi.azurewebsites.net/api'
});

