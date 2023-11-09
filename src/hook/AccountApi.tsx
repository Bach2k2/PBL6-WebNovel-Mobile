import axios from 'axios';
import { useContext } from 'react'
import { axiosInstance } from './AxiosInstance';
import { AuthContext } from '../context/AuthContext';


export const getAccountById = async (accountId: string,accessToken:string) => {
    // const authContext = useContext(AuthContext);

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const response = await axiosInstance.get(`/accounts/${accountId}`, axiosConfig);
        if (response.status === 200) {
            console.log('Đăng nhập thành công!');
            console.log(response.data);
            // authContext.setUserData(response.data);
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
        return null;
        // Chuyển sang trang 500
        throw new Error('Failed to get user');
    }
};
    // return {
    //     getAccountById,
    // };
// export default AccountApi;