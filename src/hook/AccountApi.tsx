import axios from 'axios';
import { useContext } from 'react'
import { axiosInstance } from './AxiosInstance';
import { AuthContext } from '../context/AuthContext';

// const AccountApi = (accountId: string, accessToken: string): void => {
//     const authContext = useContext(AuthContext);

//     const getAccountById = async (accountId: string, accessToken: string) => {
//         const axiosConfig = {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         };
//         try {
//             const response = await axiosInstance.get(`/accounts/${accountId}`, axiosConfig);
//             if (response.status === 200) {
//                 console.log('Đăng nhập thành công!');
//                 console.log(response.data);
//                 authContext.setUserData(response.data);
//             } else if (response.status === 401) {
//                 console.log('Sai tên đăng nhập hoặc mật khẩu!');
//             } else if (response.status === 500) {
//                 console.error('Lỗi server 500!');
//             } else {
//                 console.error('Lỗi không xác định!');
//             }
//             return response.data;
//         } catch (error) {
//             console.error(error);
//             // Chuyển sang trang 500
//             throw new Error('Failed to get user');
//         }
//     };

// };

// export default AccountApi;
const AccountApi = (authContext:any) => async (accountId:any, accessToken:any) => {
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
        authContext.setUserData(response.data);
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
      throw new Error('Failed to get user');
    }
  };
  
  export default AccountApi;