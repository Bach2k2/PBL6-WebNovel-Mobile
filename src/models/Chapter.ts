export interface Chapter {
    id: string
    name: string,
    isLocked: boolean,
    publishDate: Date
    views: number,
    rating: number,
    feeId: number,
    fee: number,
    fileContent: string,
    discount: number,
    approvalStatus: boolean,
    novelId: string,
    chapIndex: number,
    isPublished:boolean,
}
