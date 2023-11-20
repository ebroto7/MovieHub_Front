export interface MovieType {
    id?: number | string,
    title: string,
    description: string,

    genreId: string | number,
    director?: string,
    stars?: string[]
    year: number,
    poster?: string,
    duration: number,

    rated?: number,

    comments?: string[]

    userId: string | number

    createdAt?: Date,
    updatedAt?: Date
}