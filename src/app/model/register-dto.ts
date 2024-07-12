import { Student } from "./student";

export interface RegisterDto {
    id?:number;
    registerDate?: Date;
    startDate?:number;
    endDate:number;
    feeRegister:number;
    student:Student;
}
