import { MovieType } from "./movie.interface";

export interface GenreType {
    id: string | number,
    name: string,
   
    movies?: MovieType[],

    createdAt?: Date,
    updatedAt?: Date
}