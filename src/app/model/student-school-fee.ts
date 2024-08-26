import { Level } from "./level";
import { Option } from "./option";
import { Student } from "./student";

export interface StudentSchoolFee {
    id?: number;
    payOneTime: boolean;
    payMultiTime: boolean;
    firstPay: number;
    secondPay: number;
    thirdPay: number;
    schoolFeeTotal: number;
    year?: any;
    endYear: any;
    student: Student;
    level: Level;
    option: Option;
    latestDate?: Date;
}
