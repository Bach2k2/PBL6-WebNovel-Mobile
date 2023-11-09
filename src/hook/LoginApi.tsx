
import axios from 'axios';
import { axiosInstance } from './AxiosInstance';

const LoginApi = async (email:any, password:any) => {
    try {
        const response = await axios.post('https://webnovelapi.azurewebsites.net/api/auth/login', {
            username: email,
            password: password
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            console.log('Đăng nhập thành công!');
            // console.log(response.data);
        } else if (response.status === 401) {
            console.log('Sai tên đăng nhập hoặc mật khẩu!');

        } else if (response.status === 500) {
            console.error('Lỗi server 500!');
        } else {
            console.error('Lỗi không xác định!');
        }
        return response.data;
    } catch (error) {
        console.error(error);
        // Chuyển sang trang 500
        throw new Error('Failed to Login');
    }
};

export default LoginApi;
