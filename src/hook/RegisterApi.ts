
import axios from 'axios';
import { axiosInstance } from './AxiosInstance';
import { RandomString } from '../utils/RandomString';

const RegisterApi = async (publicAxios:any,email: any, password: any) => {
    try {
        const response = await publicAxios.post('/accounts', {
            id:null,
            username: email,
            password: password,
            email: email,
            nickName: RandomString(10),
            confirmPassword: password,
            phone: '122222',
            walletAmmount: 0,
            roleIds: [
                "READER"
            ],
            isAdmin: false,
            isActive: true,
            refreshToken: null,
            refreshTokenExpiryTime: null,

        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            console.log('Đăng ký thành công!');
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
        throw new Error('Failed to Register');
    }
};

export default RegisterApi;
