import { Level } from "./level";
import { Option } from "./option";

export interface SchoolFee {
    id?:number;
    totalFee:number;
    registerFee:number;
    level:Level;
    option:Option;
}
