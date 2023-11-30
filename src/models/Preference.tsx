export interface Preference {
    "novelId": string,
    "accountId": string,
    "name": string,
    "title": string,
    "author": string,
    "year": number,
    "views": number,
    "rating": number,
    "imagesURL": string,
    "genreName": string[],
    "genreIds": string[],
    "description": string,
    "status": boolean,
    "approvalStatus": boolean,
    "numChapter": number
}