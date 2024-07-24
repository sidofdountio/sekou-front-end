import { Speciality } from "./speciality";

export interface Option {
    id:number;
    name: string;
    speciality?:Speciality;
}
