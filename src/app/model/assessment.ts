import { AssessmentPeriod } from "./assessment-period";
import { Course } from "./course";
import { AssessmentType } from "./enumeration/assessment-type";
import { DayOfWeek } from "./enumeration/day-of-week";
import { Level } from "./level";
import { Option } from "./option";

export interface Assessment {
    id: number;
    startTime:any;
    endTime:any;
    year: any;
    level: Level;
    option: Option;
    course: Course;
    dayOfWeek:DayOfWeek;
    assessmentPeriod: AssessmentPeriod;
    assessmentType: AssessmentType;

}
