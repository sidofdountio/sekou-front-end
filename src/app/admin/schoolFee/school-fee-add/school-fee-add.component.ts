import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Level } from 'src/app/model/level';
import { Option } from 'src/app/model/option';
import { SchoolFee } from 'src/app/model/school-fee';
import { LevelService } from 'src/app/service/level.service';
import { NotificationService } from 'src/app/service/notification.service';
import { OptionService } from 'src/app/service/option.service';
import { SchoolFeeService } from 'src/app/service/school-fee.service';

@Component({
  selector: 'app-school-fee-add',
  templateUrl: './school-fee-add.component.html',
  styleUrls: ['./school-fee-add.component.css']
})
export class SchoolFeeAddComponent implements OnInit {
  isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.isLoading.asObservable();
  options: Option[];
  levels: Level[];

  schoolFeeForm = this.fb.group({
    level: this.fb.group({
      id: [,[Validators.required]]
    }),
    option: this.fb.group({
      id: [,[Validators.required]]
    }),
    registerFee:[,[Validators.required]],
    totalSchoolFee:[,[Validators.required]]

  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SchoolFee,
    public dialogRef: MatDialogRef<SchoolFeeAddComponent>,
    private levelService: LevelService,
    private optionService: OptionService,
    private notifier: NotificationService,
    private schoolFeeService: SchoolFeeService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
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


  onSave(): void {

    let schoolFee: SchoolFee = {
      totalFee: this.schoolFeeForm.value.totalSchoolFee,
      registerFee: this.schoolFeeForm.value.registerFee,
      level: {
        id: this.schoolFeeForm.value.level.id,
        name: ''
      },
      option: {
        id: this.schoolFeeForm.value.option.id,
        name: '',
        speciality: undefined
      }
    }
    this.isLoading.next(true);
    this.schoolFeeService.save$(schoolFee).subscribe(
      {
        next: (respons=>{
          this.isLoading.next(false);
          this.notifier.onSuccess(respons.message);
        }),
        error: (error=>{
          this.isLoading.next(false);
          this.notifier.onSuccess(error.message);
        })
      }
    )
    this.dialogRef.close(schoolFee);
  }
  onClose() {
    this.dialogRef.close();
  }
}
