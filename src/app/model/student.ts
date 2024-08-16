import { Gender } from "./enumeration/gender";
import { Level } from "./level";
import { Option } from "./option";

export interface Student {
    id?:number;
    firstName:string;
    lastName:string;
    email:string;
    dateOfBirth?: Date;
    level?:Level;
    option?:Option;
    gender?:Gender;
    age?:number;
    imageUrl?:string;
    emergencyContact?:string;
    currentGradeLevel?:string;
    phoneNumber?:string;
    address?:string;
    


    
}
