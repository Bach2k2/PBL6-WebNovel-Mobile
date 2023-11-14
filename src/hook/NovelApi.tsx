import axios from "axios";
import { axiosInstance } from './AxiosInstance.js'
export const getNovelData = async () => {
    try {
        const response = await axiosInstance.get('/novel');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data");
    }
};
export const getNovelById = async (novelId: any) => {
    console.log('param: ', novelId);
    try {
        const response = await axiosInstance.get(`/novel/${novelId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data detail");
    }
}

export const getNovelByGenre = async (genreId: any) => {
    console.log('param: ', genreId);
    try {
        const response = await axiosInstance.get(`/novel/GenreId=${genreId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data by genre");
    }
}

export const getNovelByAccount = async (accountId: any) => {
    console.log('param: ', accountId);
    try {
        const response = await axiosInstance.get(`/novel/AccountId=${accountId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data by account");
    }
}

export const createNovel = async (novel: any, accessToken: any) => {
    const formData = new FormData();
    console.log('param: ', accessToken);
    formData.append('Name', novel.Name);
    formData.append('Title', novel.Title);
    formData.append('AccountId', novel.AccountId);
    formData.append('Description', novel.Description);
    formData.append('GenreIds', novel.GenresId);
    formData.append('File', {
        uri: novel.File,
        name: 'novelImage.jpg', 
        type: 'image/jpeg',
    });
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': " multipart/form-data",
            'Accept': '*',
        },
    };
    try {
        const response = await axiosInstance.post('/novel/', formData, axiosConfig);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to post novel data by this account");
    }
}
// export default { getNovelData, getNovelById };


