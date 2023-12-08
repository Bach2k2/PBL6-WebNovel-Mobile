import axios from "axios"
import { axiosInstance } from "./AxiosInstance"

export const getRatingByUserApi = async (novelId: any, accountId: any, accessToken: any) => {
    console.log(novelId,accountId,accessToken)
    const config = {
        headers:
        {
            'Authorization': ` Bearer ${accessToken}`
        }
    }
    const res = await axiosInstance.get(`/ratings/${accountId}/${novelId}`, config);
    return res.data;
}

export const postRatingApi = async (novelId: any, accountId: any, ratingScore: number, accessToken: any) => {
    const config = {
        headers:
        {
            'Authorization': ` Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    }
    console.log(novelId, accountId, ratingScore)
    const data = {
        novelId: novelId,
        accountId: accountId,
        rateScore: ratingScore
    }
    const res = await axiosInstance.post('/ratings/', data, config);
    return res.data
}

export const deleteRatingApi = async (novelId: any, accountId: any, accessToken: any) => {
    const config = {
        headers:
        {
            'Authorization': ` Bearer ${accessToken}`
        }
    }
    const data = {
        novelId: novelId,
        accountId: accountId,
    }
    const res = await axiosInstance.delete('/ratings/', { data: data, ...config });
    return res.data
}