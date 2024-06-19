import { Course } from "./course";
import { CourseEnrollment } from "./course-enrollment";
import { Level } from "./level";
import { Option } from "./option";
import { Speciality } from "./speciality";
import { Student } from "./student";

export interface CustomResponse {
    timeStamp: string;
    statusCode: number;
    status: string;
    message: string;
    data: {
        courses?: Course[],course?: Course
        level?:Level, levels?:Level[], 
        speciality?:Speciality,specialities?:Speciality[],
        option?:Option, options:Option[],
        coursesEnrollments?: CourseEnrollment[],coursesEnrollment?: CourseEnrollment,
        stutdent?:Student,students?:Student[]
    };
}
