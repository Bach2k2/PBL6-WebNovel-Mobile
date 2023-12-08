import axios from 'axios';
import { useContext } from 'react'
import { axiosInstance } from './AxiosInstance';
import { AuthContext } from '../context/AuthContext';
import { User } from '../models/User';

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

const GetAccountApi = (authContext: any) => async (accountId: any, accessToken: any) => {
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axiosInstance.get(`/accounts/${accountId}`, axiosConfig);
    if (response.status === 200) {
      console.log('Lấy dữ liệu thành công');
      console.log(response.data);
      authContext.setUserData(response.data);
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


export const UpdateAccountApi = (authContext: any) => async (user: User, accessToken: any) => {
  console.log('user', user);
  const formData = new FormData();
  formData.append('Id', user.id)
  formData.append('Nickname', user.nickName)
  formData.append('Username', user.username)
  formData.append('Password', user.password)
  formData.append('ConfirmPassword', user.password)
  formData.append('Email', user.email)
  formData.append('IsAdmin', user.isAdmin)
  formData.append('RoleIds', user.roleIds)
  formData.append('Phone', user.email)
  formData.append('WalletAmmount', user.walletAmmount)
  formData.append('IsActive', user.isActive)
  formData.append('File', user.imagesURL)
  formData.append('Birthday', user.birthday)
  const axiosConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axiosInstance.put(`/accounts/`, formData, axiosConfig);
    if (response.status === 200) {
      console.log('Lấy dữ liệu thành công');
      console.log(response.data);
      authContext.setUserData(response.data);
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


export default GetAccountApi;