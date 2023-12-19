import { axiosInstance } from "./AxiosInstance"


export const getBundlesApi = async () => {
    const res = await axiosInstance.get('/bundles');
    return res.data;
}

export const getPaymentApi = async (accountId: any, accessToken: any) => {
    try {
        const axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
        const res = await axiosInstance.get(`/payment/AccountId=${accountId}`, axiosConfig);
        return res.data;
    } catch (err) {
        console.error(err);
    }
}


export const createOrderApi = async (accountId: any, bundle: any, accessToken: any) => {
    try {
        // console.log(bundleId);
        const axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
        const res = await axiosInstance.post('/orders', { accountId: accountId, bundleId: bundle.id }, axiosConfig);
        return res.data;
    } catch (err) {
        console.error(err);
    }

}

export const createPaymentApi = async (OrderId: string, Price: any, accessToken: any) => {
    try {
        console.log(Price)
        if (typeof Price === 'string') {
            // Chuyển đổi chuỗi sang số thực (float)
            Price = parseFloat(Price);
        }

        // Kiểm tra nếu Price là kiểu dữ liệu float
        if (typeof Price === 'number' && !isNaN(Price)) {
            console.log("Kiểu dữ liệu của Price là float:", Price);
        }

        const data = {
            "paymentCurrency": "VND",
            "paymentRefId": OrderId,
            "requiredAmount": Price,
            "paymentLanguage": "vn",
            "merchantId": "MER0001",
            "paymentDestinationId": "VNPAY",
            "signature": "12345ABCD"
        }
        const axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
        const res = await axiosInstance.post('/payment', data, axiosConfig);
        return res.data;
    } catch (err) {
        console.error(err);
    }

}


