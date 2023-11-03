import axios from "axios";
const serverURL = "https://webnovelapi.azurewebsites.net";

// Tạo một Axios instance với cấu hình tiêu đề JSON và CORS cho phép bất kỳ nguồn gốc (Allow Any Origin)
const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

export { serverURL, axiosInstance };