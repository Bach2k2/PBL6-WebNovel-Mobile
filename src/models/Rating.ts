export interface Rating {
    "id": number,
    "accountId": string,
    "novelId": string,
    "text": string,
    "createOn": Date,
    "ratingScore": number | 0,
}