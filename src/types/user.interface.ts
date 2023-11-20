import { MovieType } from "./movie.interface";

export interface UserType {
    id: string | number,
    name: string,
    email: string,
    movies?: MovieType[],

    createdAt?: Date,
    updatedAt?: Date
}