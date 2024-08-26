import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentRequest } from 'src/app/model/student-request';
import { StudentService } from 'src/app/service/student.service';

/**
 * Form to add new student.
 */
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  studentReq = this.fbuilde.group({
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required]],
    email:['',[Validators.email]],
    gender:['',[Validators.required]],
    dateOfBirth:['',[Validators.required]]
  })
  constructor(private fbuilde: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: StudentRequest,
   public dialogRef: MatDialogRef<AddStudentComponent>) { }

  onSave() {
    let student: StudentRequest = {
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      dateOfBirth: ''
    }
    this.dialogRef.close(this.studentReq.value as StudentRequest);
  }
  
  onClose() {
    this.dialogRef.close();
  }

}
