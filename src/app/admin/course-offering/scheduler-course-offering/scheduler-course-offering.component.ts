import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Course } from 'src/app/model/course';
import { CourseOffering } from 'src/app/model/course-offering';
import { Level } from 'src/app/model/level';
import { Option } from 'src/app/model/option';
import { Teacher } from 'src/app/model/teacher';
import { CourseOfferingServiceService } from 'src/app/service/course-offering-service.service';
import { CourseService } from 'src/app/service/course.service';
import { LevelService } from 'src/app/service/level.service';
import { NotificationService } from 'src/app/service/notification.service';
import { OptionService } from 'src/app/service/option.service';
import { TeacherService } from 'src/app/service/teacher-service.service';

@Component({
  selector: 'app-scheduler-course-offering',
  templateUrl: './scheduler-course-offering.component.html',
  styleUrls: ['./scheduler-course-offering.component.css']
})
export class SchedulerCourseOfferingComponent {
  isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.isLoading.asObservable();
  courseOfferingToSave: CourseOffering;

  // Form to enroll course.
  courseOfferingForm = this.fbuilde.group({
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    day: ['', [Validators.required]],
    year: ['', [Validators.required]],
    level: this.fbuilde.group({
      id: [0, [Validators.required]]
    }),
    option: this.fbuilde.group({
      id: [0, [Validators.required]]
    }),
    course: this.fbuilde.group({
      id: [0, [Validators.required]]
    }),
    teacher: this.fbuilde.group({
      id: [0, [Validators.required]]
    })
  });

  option: Option;
  // List
  courses: Course[];
  options: Option[];
  levels: Level[];
  teachers: Teacher[];
  currentYear: any;

  constructor(private fbuilde: FormBuilder, 
    private courseOfferingService: CourseOfferingServiceService,
    private levelService: LevelService,
    private optionService: OptionService,
    private notifier: NotificationService,
    private courseService: CourseService,
    private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    // Fetch level.
    this.levelService.levels$.subscribe(
      (response) => { this.levels = response.data.levels; },
      (error) => { console.error("error %d", error); }
    );

    // Fetch option.
    this.optionService.options$.subscribe(
      (response) => { this.options = response.data.options; },
      (error) => { console.error("error %d", error); }
    );
    // Fetch courses.
    this.courseService.courses$.subscribe(
      (response) => { this.courses = response.data.courses; },
      (error) => { console.error("error %d", error); }
    );
    // Fetch teachers.
    this.teacherService.teachers$.subscribe(
      (response) => { this.teachers = response.data.teachers; },
      (error) => { console.error("error %d", error); }
    );
  }



  onSave() {

    let courseOffering: CourseOffering = {
      id: null,
      startTime: this.courseOfferingForm.value.startTime,
      endTime: this.courseOfferingForm.value.endTime,
      dayOfWeek: this.courseOfferingForm.value.day as any,
      year: this.courseOfferingForm.value.year,
      option: {
        id: this.courseOfferingForm.value.option.id,
        name: ''
      },
      level: {
        id: this.courseOfferingForm.value.level.id,
        name: ''
      },
      course: {
        id: this.courseOfferingForm.value.course.id,
        title: '',
        credit: 0
      },
      teacher: {
        id: this.courseOfferingForm.value.teacher.id,
        lastName: '',
        firstName: '',
        email: '',
        phone: '',
        disploma: '',
        exprience: ''
      }
    };
    this.isLoading.next(true);
    // TODO: if(parseInt(this.courseOfferingForm.value.year) <  )
    
    this.courseOfferingService.save$(courseOffering).subscribe({
      next: (response => {
        this.isLoading.next(false)
        this.notifier.onSuccess(response.message);
        // this.courseOfferingForm.reset();
      }),
      error: any => {
        this.isLoading.next(false);
        this.notifier.onError("cannot be able to schduler course");
      }
    });
  }


}
