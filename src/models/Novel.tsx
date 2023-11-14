export interface Novel {
    id: number,
    name: string,
    title: string,
    author: string,
    year: number,
    views: number,
    rating: number,
    description: string,
    coverImageUrl: string,
    imagesURL: string
    status: boolean,
    approvalStatus: boolean,
    tags: Array<string>,
    genres: Array<string>
    genreIds: Array<number>
    genreName: Array<string>
    numChapter: number
}