import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Register } from 'src/app/model/register';
import { Student } from 'src/app/model/student';
import { RegisterService } from 'src/app/service/register.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-registe-student',
  templateUrl: './registe-student.component.html',
  styleUrls: ['./registe-student.component.css']
})
export class RegisteStudentComponent implements OnInit {


  register = this.fbuilde.group({
    feeRegister: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    student: this.fbuilde.group({
      id: ['', [Validators.required]]
    })
  })
  students: Student[];

  constructor(private fbuilde: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: Register, public dialogRef: DialogRef,
   private registerService: RegisterService, private studentService:StudentService) { }

  ngOnInit(): void {
    
    this.studentService.students$.subscribe(
      response => {
        this.students = response.data.students;
      },error => {}
    );
  }
  onSave() {
    let register: Register = {
      feeRegister: this.register.value.feeRegister as any,
      valid: false,
      endDate: this.register.value.endDate as any,
      student: {
        id: this.register.value.student.id as any,
        firstName: '',
        lastName: '',
        email: '',
        level: undefined,
        option: undefined
      }
    }
    this.dialogRef.close(register);
  }
  onClose() {
    this.dialogRef.close();
  }
}
