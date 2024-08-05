import { Level } from "./level";
import { Option } from "./option";
import { Student } from "./student";

export interface Register {
    id?:number;
    feeRegister:number;
    valid?:boolean;
    registerDate?:Date;
    startDate?:number;
    endDate:number;
    student:Student;
    level:Level;
    option:Option;
}
