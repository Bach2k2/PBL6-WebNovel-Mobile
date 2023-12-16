export interface Comment {
    id: number,
    accountId: string,
    novelId: string,
    text: string,
    username: string,
    email: string,
    nickName: string,
    roleIds: Array<string>,
    createOn: string,
    ratingScore: number,
    accountImagesURL: string,
}