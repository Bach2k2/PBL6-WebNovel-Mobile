import axios from "axios";
import { axiosInstance } from './AxiosInstance'
import { Novel } from "../models/Novel";
export const getNovelData = async (publicAxios:any) => {
    try {
        const response = await publicAxios.get('/novel');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data");
    }
};
export const getNovelDataExcept = async (publicAxios:any,novelId: string) => {
    try {
        const response = await publicAxios.get('/novel');
        return response.data.filter((novel: Novel) => novel.id !== novelId);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data");
    }
};
export const getNovelById = async (publicAxios:any,novelId: any) => {
    try {
        const response = await publicAxios.get(`/novel/${novelId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data detail");
    }
}

export const getNovelByGenre = async (publicAxios:any,genreId: any) => {
    try {
        const response = await publicAxios.get(`/novel/GenreId=${genreId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data by genre");
    }
}
export const getRelatedNovelByGenre = async (publicAxios:any,novelId: string, genreId: any) => {
    try {
        const response = await publicAxios.get(`/novel/GenreId=${genreId}`);
        return response.data.filter((novel: Novel) => novel.id !== novelId);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch novel data by genre");
    }
}

//API lay danh sach truyen cua nguoi dung
export const getNovelByAccount = async (publicAxios:any,accountId: any) => {
    try {
        const response = await publicAxios.get(`/novel/AccountId=${accountId}`);
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
    formData.append('BackgroundFile', {
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
    console.log('edit novel',novel)
    const formData = new FormData();
    formData.append('Id', novel.id)
    formData.append('Name', novel.name);
    formData.append('Title', novel.title);
    formData.append('Views', novel.views);
    formData.append('Description', novel.description);
    formData.append('Status', novel.status);
    formData.append('ApprovalStatus', novel.approvalStatus);
    novel.genreIds.forEach((genreId: any) => {
        formData.append('GenreIds', genreId);
    });
    // formData.append('GenreIds', novel.genreIds);
    formData.append('File', {
        uri: novel.imagesURL,
        name: 'novelImage.jpg',
        type: 'image/jpeg',
    });
    // console.log(formData);
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': "multipart/form-data",
            'Accept': '*',
        },
    };
    try {
        const response = await axiosInstance.put('/novel/', formData, axiosConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to put novel data by this account");
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


