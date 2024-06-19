import { Student } from "./student";

export interface Register {
    id?:number;
    feeRegister:number;
    valid:boolean;
    registerDate?:Date;
    stardDate?:number;
    endDate:number;
    student:Student;
}
