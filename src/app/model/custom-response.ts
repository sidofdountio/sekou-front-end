import { Assessment } from "./assessment";
import { AssessmentPeriod } from "./assessment-period";
import { Course } from "./course";
import { CourseEnrollment } from "./course-enrollment";
import { CourseOffering } from "./course-offering";
import { Level } from "./level";
import { Option } from "./option";
import { Register } from "./register";
import { SchoolFee } from "./school-fee";
import { Speciality } from "./speciality";
import { Student } from "./student";
import { StudentAssessment } from "./student-assessment";
import { StudentSchoolFee } from "./student-school-fee";
import { Teacher } from "./teacher";

export interface CustomResponse {
  timeStamp: string;
  statusCode: number;
  status: string;
  message: string;
    data: {
        courses?: Course[],course?: Course
        level?:Level, levels?:Level[],
        speciality?:Speciality,specialities?:Speciality[],
        option?:Option, options?:Option[],
        coursesEnrollments?: CourseEnrollment[],coursesEnrollment?: CourseEnrollment,
        student?:Student,students?:Student[],
        register?:Register,registers?:Register[],
        courseOffering?:CourseOffering,courseOfferings?:CourseOffering[],
        teacher?:Teacher,teachers?:Teacher[],
        assessment?:Assessment,assessments?:Assessment[],
        studentAssessment?:StudentAssessment,studentAssessments?:StudentAssessment[],
        period?:AssessmentPeriod,periods?:AssessmentPeriod[],
        schoolFee?:SchoolFee,schoolFees?:SchoolFee[],
        studentSchoolFee?:StudentSchoolFee, studentSchoolFees?:StudentSchoolFee[]
    };
}
