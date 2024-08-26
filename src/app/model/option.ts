import { Speciality } from "./speciality";

export interface Option {
    id:number;
    name: string;
    fullName?:string;
    speciality?:Speciality;
}
