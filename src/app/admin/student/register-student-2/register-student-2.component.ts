import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RegisterDto } from 'src/app/model/register-dto';
import { Student } from 'src/app/model/student';
import { NotificationService } from 'src/app/service/notification.service';
import { RegisterService } from 'src/app/service/register.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-register-student-2',
  templateUrl: './register-student-2.component.html',
  styleUrls: ['./register-student-2.component.css']
})
export class RegisterStudent2Component implements OnInit {
message:string;
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
    endDate: [, Validators.required]

  })

  constructor(private studentService: StudentService, private route: ActivatedRoute, private fbuilder: FormBuilder,
    private registerService: RegisterService, private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get("id");
    this.studentService.student$(id).subscribe(
      (response) => {
        this.student = response.data.student;
        console.log(response.data.student)
      }, () => { }
    )
  }

  onSave() {
    let register: RegisterDto = {
      id: 0,
      endDate: this.registerStudentForm.value.endDate,
      feeRegister: this.registerStudentForm.value.feeRegister,
      student: {
        id: this.student.id,
        firstName: '',
        lastName: '',
        email: '',
        level: {
          id: 0,
          name: ''
        }
      }
    }
    this.registerService.save$(register).subscribe(
      (response) => {
        this.notificationService.onSuccess(response.message);
      }, (error) => { this.notificationService.onError("Can't save") }
    )
  }
}
