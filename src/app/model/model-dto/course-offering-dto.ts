import { DayOfWeek } from "../enumeration/day-of-week";

export interface CourseOfferingDto {
    startTime:any;
    endTime:any;
    dayOfWeek:DayOfWeek;
    // levelId:number;
    optionId:number;
    courseId:number;
    teacherId:number;
    year:any;
}
