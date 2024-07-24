import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Assessment } from 'src/app/model/assessment';
import { Course } from 'src/app/model/course';
import { Level } from 'src/app/model/level';
import { Option } from 'src/app/model/option';
import { AssessmentService } from 'src/app/service/assessment.service';
import { CourseService } from 'src/app/service/course.service';
import { LevelService } from 'src/app/service/level.service';
import { NotificationService } from 'src/app/service/notification.service';
import { OptionService } from 'src/app/service/option.service';

@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrls: ['./add-assessment.component.css']
})
export class AddAssessmentComponent implements OnInit {
  isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.isLoading.asObservable();
  date: any;
  due: any;
  periodId:number=0;
  // List
  courses: Course[];
  options: Option[];
  levels: Level[];
  currentYear: any = null;

  assessmentForm = this.fbuild.group({
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    day: ['', [Validators.required]],
    assessmentType: ['', [Validators.required]],
    year: ['', [Validators.required, Validators.maxLength(4)]],
    level: this.fbuild.group({
      id: [0, [Validators.required]]
    }),
    option: this.fbuild.group({
      id: [0, [Validators.required]]
    }),
    course: this.fbuild.group({
      id: [0, [Validators.required]]
    }),
  });

  constructor(private fbuild: FormBuilder,
    private levelService: LevelService,
    private optionService: OptionService,
    private notifier: NotificationService,
    private courseService: CourseService,
    private assessmentService: AssessmentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.date= this.route.snapshot.paramMap.get("date");
    this.due = this.route.snapshot.paramMap.get("due");
    this.periodId = parseInt( this.route.snapshot.paramMap.get("id"));
    this.currentYear = new Date().getFullYear();
    console.log(this.currentYear)
    // Fetch level.
    this.levelService.levels$.subscribe(
      (response) => { this.levels = response.data.levels; },
      (error) => { console.error("error %d", error); }
    );
    // Fetch courses.
    this.courseService.courses$.subscribe(
      (response) => { this.courses = response.data.courses; },
      (error) => { console.error("error %d", error); }
    );
    // Fetch option.
    this.optionService.options$.subscribe(
      (response) => { this.options = response.data.options; },
      (error) => { console.error("error %d", error); }
    );
  }

  onSaveAssessment() {
    let assessmentToSave: Assessment = {
      id: 0,
      assessmentType: this.assessmentForm.value.assessmentType as any,
      year: this.assessmentForm.value.year,
      level: {
        id: this.assessmentForm.value.level.id,
        name: ''
      },
      option: {
        id: this.assessmentForm.value.option.id,
        name: '',
        speciality: undefined
      },
      course: {
        id: this.assessmentForm.value.course.id,
        title: '',
        credit: 0,
      },
      startTime: this.assessmentForm.value.startTime,
      endTime: this.assessmentForm.value.endTime,
      assessmentPeriod: {
        id: this.periodId,
        date: this.date,
        due:this.date
      },
      dayOfWeek: this.assessmentForm.value.day as any
    }
    console.log(assessmentToSave);
    this.isLoading.next(true);
    this.assessmentService.save$(assessmentToSave).subscribe({
      next: (response => {
        this.isLoading.next(false)
        this.notifier.onSuccess(response.message);
        this.assessmentForm.reset();
      }),
      error: any => {
        this.isLoading.next(false);
        this.notifier.onError("cannot be able to schduler assessment");
        this.assessmentForm.reset();
      }
    });
  }
}
