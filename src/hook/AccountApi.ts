import axios from 'axios';
import { axiosInstance } from './AxiosInstance';
import { User } from '../models/User';

const GetAccountApi = async (authAxios: any, accountId: any, accessToken: any) => {
  console.log(accessToken)
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axiosInstance.get(`/accounts/${accountId}`, axiosConfig);
    if (response.status === 200) {
      console.log(response.data);
      // authContext.setUserData(response.data);
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


export const UpdateAccountApi = async (user: User, accessToken: any) => {
  console.log('user in update api', user);
  const formData = new FormData();
  formData.append('Id', user.id)
  formData.append('Nickname', user.nickName)
  formData.append('Username', user.username)
  formData.append('Password', null)
  formData.append('ConfirmPassword', null)
  formData.append('Email', user.email)
  formData.append('IsAdmin', user.isAdmin)
  formData.append('RoleIds', user.roleIds)
  formData.append('Phone', user.phone)
  formData.append('WalletAmmount', user.walletAmmount)
  formData.append('WalletAmmount', user.creatorWallet)
  formData.append('IsActive', user.isActive)
  formData.append('File', {
    uri: user.imagesURL,
    name: 'novelImage.jpg',
    type: 'image/jpeg',
  });
  formData.append('Birthday', user.birthday)
  const axiosConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axiosInstance.put(`/accounts/`, formData, axiosConfig);
    if (response.status === 200) {
      console.log('Lấy dữ liệu thành công');
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