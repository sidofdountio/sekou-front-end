import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentAssessmentService } from 'src/app/service/student-assessment.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Option } from 'src/app/model/option';
import { Validators, FormBuilder } from '@angular/forms';
import { Course } from 'src/app/model/course';
import { Level } from 'src/app/model/level';
import { AssessmentService } from 'src/app/service/assessment.service';
import { CourseService } from 'src/app/service/course.service';
import { LevelService } from 'src/app/service/level.service';
import { NotificationService } from 'src/app/service/notification.service';
import { OptionService } from 'src/app/service/option.service';


/**
 * Register student mark for assessment.
 * This componnent will be used to save student note (mark) for each exam and year school
 */
@Component({
  selector: 'app-student-assessment',
  templateUrl: './student-assessment.component.html',
  styleUrls: ['./student-assessment.component.css']
})
export class StudentAssessmentComponent implements OnInit {
  date: any;
  due: any;
  periodId: number = 0;
  // List
  courses: Course[];
  options: Option[];
  levels: Level[];
  currentYear: any = null;

  studentAssessmentForm = this.fbuild.group({
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
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




  netxSaveStudentAssessment() {
    console.log(this.studentAssessmentForm.value);
    if (parseInt(this.studentAssessmentForm.value.year) < this.currentYear) {
      console.error("Not valid date");
      this.notifier.onWarning("You Provid No Valid Current Year School.");
    } else {

      this.router.navigate(["admin/save-student-assessment/",
        this.studentAssessmentForm.value.level.id,
        this.studentAssessmentForm.value.option.id,
        this.studentAssessmentForm.value.course.id,
        this.studentAssessmentForm.value.assessmentType,
        this.studentAssessmentForm.value.year,
      ]);
    }

  }


}
