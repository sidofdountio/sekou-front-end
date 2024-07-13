import { Course } from "./course";
import { DayOfWeek } from "./enumeration/day-of-week";
import { Level } from "./level";
import { Option } from "./option";
import { Teacher } from "./teacher";

export interface CourseOffering {
    id:number;
    startTime:number;
    endTime:number;
    dayOfWeek:DayOfWeek;
    level:Level;
    option:Option;
    course:Course;
    teacher:Teacher;
    year?:any;
}
