import { axiosInstance } from "./AxiosInstance";

export const postReportApi = async (data: any, accessToken: any) => {
    const reportData = {
        "accountId": data.accountId,
        "novelId": data.novelId,
        "reason": data.reason
    }
    const config = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    }
    const res = await axiosInstance.post('/reports', reportData, config);
    return res.data;
}
