import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/model/course';
import { CourseEnrollment } from 'src/app/model/course-enrollment';
import { Level } from 'src/app/model/level';
import { Option } from 'src/app/model/option';
import { CourseService } from 'src/app/service/course.service';
import { LevelService } from 'src/app/service/level.service';
import { OptionService } from 'src/app/service/option.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-enrollment-courses',
  templateUrl: './enrollment-courses.component.html',
  styleUrls: ['./enrollment-courses.component.css']
})
export class EnrollmentCoursesComponent implements OnInit {

  // Form to enroll course.
  courseEnrollmentForm = this.fbuilde.group({
    course: this.fbuilde.group({
      id: [, [Validators.required]]
    }),
    level: this.fbuilde.group({
      id: [, [Validators.required]]
    }),
    option: this.fbuilde.group({
      id: [, [Validators.required]]
    })
  });

  // List
  courses: Course[];
  options: Option[];
  levels: Level[];

  constructor(private fbuilde: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: CourseEnrollment, public dialogRef: MatDialogRef<EnrollmentCoursesComponent>,
    private levelService: LevelService, private optionService: OptionService, private courseService: CourseService) { }

  ngOnInit(): void {
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

  onSave() {
    console.log(this.courseEnrollmentForm.value)
    this.dialogRef.close(this.courseEnrollmentForm.value as CourseEnrollment);
  }
  
  onClose() {
    this.dialogRef.close();
  }

}
