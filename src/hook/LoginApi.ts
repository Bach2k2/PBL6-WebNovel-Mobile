
import axios from 'axios';
import { axiosInstance } from './AxiosInstance';

export const LoginApi = async (publicAxios:any,email:any, password:any) => {
    try {
        const response = await publicAxios.post('https://webnovelapi.azurewebsites.net/api/auth/login', {
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
export const LoginWithGoogleApi = async (userInfo: any) => {
    try {
        const user = userInfo.user
        // console.log('here', user);
        // console.log(userInfo.idToken);

        const formData = new FormData();
        formData.append('Name', user.name);
        formData.append('Email', user.email);
        formData.append('Picture', user.photo);
        formData.append('EmailVeriFied', true);
        const response = await axios.post('https://webnovelapi.azurewebsites.net/google',
            formData
            , {
                headers: {
                    'Accept': '*',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userInfo.idToken}`
                }
            });
        return response.data;
    } catch (error) {
        console.error(error);
        // Chuyển sang trang 500
        throw new Error('Failed to Login');
    }
};

// export default LoginApi;
