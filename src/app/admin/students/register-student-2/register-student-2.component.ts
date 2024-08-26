import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Level } from 'src/app/model/level';
import { Option } from 'src/app/model/option';
import { Register } from 'src/app/model/register';
import { Student } from 'src/app/model/student';
import { LevelService } from 'src/app/service/level.service';
import { NotificationService } from 'src/app/service/notification.service';
import { OptionService } from 'src/app/service/option.service';
import { RegisterService } from 'src/app/service/register.service';
import { StudentService } from 'src/app/service/student.service';

/**
 * Another form for register student.
 */
@Component({
  selector: 'app-register-student-2',
  templateUrl: './register-student-2.component.html',
  styleUrls: ['./register-student-2.component.css']
})

export class RegisterStudent2Component implements OnInit {
  options: Option[];
  levels: Level[];
  isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.isLoading.asObservable();
  message: string;
  student: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    level: {
      id: 0,
      name: ''
    }
  };
  registerStudentForm = this.fbuilder.group({
    feeRegister: [0, [Validators.required]],
    endDate: [, Validators.required],
    level: this.fbuilder.group({
      id: [0, [Validators.required]]
    }),
    option: this.fbuilder.group({
      id: [0, [Validators.required]]
    }),

  });
  private registed: boolean = false;


  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute, private fbuilder: FormBuilder,
    private registerService: RegisterService,
    private notificationService: NotificationService,
    private levelService: LevelService,
    private optionService: OptionService,
  ) { }

  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get("id");
    this.studentService.student$(id).subscribe(
      (response) => {
        this.student = response.data.student;
        console.log(response.data.student)
      }, () => { }
    );
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
  }

  onSave() {
    this.isLoading.next(true);
    let register: Register = {
      id: 0,
      endDate: this.registerStudentForm.value.endDate,
      feeRegister: this.registerStudentForm.value.feeRegister,
      student: {
        id: this.student.id,
        firstName: this.student.firstName,
        lastName: this.student.lastName,
        email: this.student.email,
        dateOfBirth: this.student.dateOfBirth,
        gender: this.student.gender,
        level: {
          id: this.registerStudentForm.value.level.id,
          name: ''
        },
        option: {
          id: this.registerStudentForm.value.option.id,
          name: '',
          speciality: undefined
        }
      },
      level: {
        id: this.registerStudentForm.value.level.id,
        name: ''
      },
      option: {
        id: this.registerStudentForm.value.option.id,
        name: '',
        speciality: undefined
      }
    }
    let studentToUpdate: Student;
    this.registerService.save$(register).subscribe(
      {
        next: (response) => {
          this.notificationService.onSuccess(response.message);
          this.registed = true;
          // Now update student.
          studentToUpdate = {
            id: this.student.id,
            firstName: this.student.firstName,
            lastName: this.student.lastName,
            email: this.student.email,
            dateOfBirth: this.student.dateOfBirth,
            gender: this.student.gender,
            level: {
              id: this.registerStudentForm.value.level.id,
              name: ''
            },
            option: {
              id: this.registerStudentForm.value.option.id,
              name: '',
              speciality: undefined
            }
          };
          
          this.updateStudent(studentToUpdate);
          this.isLoading.next(false);
          // this.registerStudentForm.reset();
        },
        error: (error) => {
          // this.registerStudentForm.reset();
          this.isLoading.next(false);
          this.notificationService.onError("cannot register this student")
        }
      }
    );
  }

  // We update update info only if it was registed for the current year.
  updateStudent(student: Student) {
    if (this.registed) {
      this.studentService.updateStudent$(student).subscribe(
        {
          next: (response) => {
            this.notificationService.onSuccess(response.message);
          },
          error: (error) => { this.notificationService.onError("can't register") }
        }
      )
    }
  }
}
