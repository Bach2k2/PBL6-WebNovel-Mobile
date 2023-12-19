export interface Payment {
    id: string,
    orderId: string,
    accountId: string,
    username: string,
    email: string,
    bundleId: number,
    coinAmount: number,
    price: number,
    paymentDate: string,
    paymentStatus: string
}