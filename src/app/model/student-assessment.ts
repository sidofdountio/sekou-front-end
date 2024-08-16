import { Course } from "./course";
import { Appreciation } from "./enumeration/appreciation";
import { AssessmentType } from "./enumeration/assessment-type";
import { Level } from "./level";
import { Option } from "./option";
import { Student } from "./student";

export interface StudentAssessment {
    id: number;
    year: any;
    level: Level;
    option: Option;
    course: Course;
    assessmentType: AssessmentType;
    student:Student;
    feedback:string;
    score:number;
    appreciation?:Appreciation;
}
