import { axiosInstance } from "./AxiosInstance";


export const handleRefreshToken = async () => {
    try {
        const { data } = await axiosInstance.get("auth/login/refresh-token");
        //   storeAccessTokenToLocal(data.accessToken);
        //   storeRefreshTokenToLocal(data.refreshToken);
        
    } catch (error) {
        console.log(error);
    }
};