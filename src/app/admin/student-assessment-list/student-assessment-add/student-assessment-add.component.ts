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
    score: [0, [Validators.required]],
    feedback: ["", [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: number,
    public dialogRef: MatDialogRef<StudentAssessmentAddComponent>
  ) { }


  addScore() {

    let formValue: ScoreFeeback = {
      score: this.scoreForm.value.score,
      feeback: this.scoreForm.value.feedback
    }
    this.dialogRef.close(formValue);
  }


  close() {
    this.dialogRef.close();
  }

}

export interface ScoreFeeback {
  score: number;
  feeback: string;
}
