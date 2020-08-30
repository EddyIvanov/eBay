

export interface IBooksAPI {
    totalItems: number,
    items: IBook[],
}

export interface IBook {
    id: string,
    volumeInfo: BookInfo,
}

interface BookInfo {
    title: string,
    authors: string[],
    publisher: string,
    publishedDate: string,
    description: string,
    imageLinks: BookImages
}

interface BookImages {
    smallThumbnail: string,
    thumbnail: string
}