import { MovieType } from "./movie.interface";

export interface UserType {
    id: string | number,
    name: string,
    email: string,
    password?: string
    movies?: MovieType[],

    createdAt?: Date,
    updatedAt?: Date
}