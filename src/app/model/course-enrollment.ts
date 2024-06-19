import { Course } from "./course";
import { Level } from "./level";
import { Option } from "./option";

export interface CourseEnrollment {
    id:number;
    course:Course;
    option:Option;
    level:Level;
}
