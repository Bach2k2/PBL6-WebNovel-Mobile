import axios from "axios";
import { axiosInstance } from './AxiosInstance.js'
import { Novel } from "../models/Novel.js";
export const getNovelData = async () => {
    try {
        const response = await axiosInstance.get('/novel');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data");
    }
};
export const getNovelDataExcept = async (novelId: string) => {
    try {
        const response = await axiosInstance.get('/novel');
        return response.data.filter((novel: Novel) => novel.id !== novelId);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data");
    }
};
export const getNovelById = async (novelId: any) => {
    try {
        const response = await axiosInstance.get(`/novel/${novelId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data detail");
    }
}

export const getNovelByGenre = async (genreId: any) => {
    try {
        const response = await axiosInstance.get(`/novel/GenreId=${genreId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data by genre");
    }
}
export const getRelatedNovelByGenre = async (novelId: string, genreId: any) => {
    try {
        const response = await axiosInstance.get(`/novel/GenreId=${genreId}`);
        return response.data.filter((novel: Novel) => novel.id !== novelId);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data by genre");
    }
}

export const getNovelByAccount = async (accountId: any) => {
    try {
        const response = await axiosInstance.get(`/novel/AccountId=${accountId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data by account");
    }
}

export const createNovel = async (novel: any, GenreIds: any, accessToken: any) => {
    console.log('genreIDs', novel)
    const formData = new FormData();
    formData.append('Name', novel.Name);
    formData.append('Title', novel.Title);
    formData.append('AccountId', novel.AccountId);
    formData.append('Description', novel.Description);
    // formData.append('GenreIds', novel.GenreIds);
    GenreIds.forEach((genreId: any) => {
        formData.append('GenreIds', genreId);
    });
    formData.append('File', {
        uri: novel.File,
        name: 'novelImage.jpg',
        type: 'image/jpeg',
    });
    console.log(formData);
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': "multipart/form-data",
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
export const EditNovel = async (novel: Novel, accessToken: any) => {
    const formData = new FormData();
    formData.append('Id', novel.id)
    formData.append('Name', novel.name);
    formData.append('Title', novel.title);
    formData.append('Views', novel.views);
    formData.append('Description', novel.description);
    formData.append('ApprovalStatus', novel.approvalStatus);
    formData.append('GenreIds', novel.genreIds);
    formData.append('File', {
        uri: novel.imagesURL,
        name: 'novelImage.jpg',
        type: 'image/jpeg',
    });
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': "multipart/form-data",
            'Accept': '*',
        },
    };
    try {
        const response = await axiosInstance.put('/novel/', formData, axiosConfig);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to post novel data by this account");
    }
}
export const DeleteNovel = async (novel: Novel, accessToken: any) => {

    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': "application/json",
        },
        data: {
            id: novel.id,
        },
    }
    try {
        const response = await axiosInstance.delete('/novel/', axiosConfig);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to post novel data by this account");
    }
}
// export default { getNovelData, getNovelById };

export const searchNovelByKey = async (key: any) => {
    try {
        const response = await axiosInstance.get(`/novel?Key=${key}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data");
    }
};


