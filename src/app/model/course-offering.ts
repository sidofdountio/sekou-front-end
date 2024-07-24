import { Course } from "./course";
import { DayOfWeek } from "./enumeration/day-of-week";
import { Level } from "./level";
import { Option } from "./option";
import { Teacher } from "./teacher";

export interface CourseOffering {
    id:number;
    startTime:any;
    endTime:any;
    dayOfWeek:DayOfWeek;
    option:Option;
    level:Level;
    course:Course;
    teacher:Teacher;
    year:any;
}
