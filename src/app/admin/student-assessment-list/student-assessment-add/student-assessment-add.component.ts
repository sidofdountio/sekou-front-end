import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-assessment-add',
  templateUrl: './student-assessment-add.component.html',
  styleUrls: ['./student-assessment-add.component.css']
})
export class StudentAssessmentAddComponent {

scoreForm = this.fb.group({
  score: [0,[Validators.required]],
  feedback: ["",[Validators.required]]
});

constructor(private fb:FormBuilder,
  @Inject(MAT_DIALOG_DATA)data:number,
  public dialogRef:MatDialogRef<StudentAssessmentAddComponent>
){}


addScore() {
  let formValue: {
    score:number,
    feeback:string
  }
  formValue={
    score : this.scoreForm.value.score,
    feeback:this.scoreForm.value.feedback
  }
  this.dialogRef.close(formValue as any);
}


close() {
  this.dialogRef.close();
}


  
}
