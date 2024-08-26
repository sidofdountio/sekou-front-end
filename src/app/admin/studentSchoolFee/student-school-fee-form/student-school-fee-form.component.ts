import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Level } from 'src/app/model/level';
import { Option } from 'src/app/model/option';
import { Student } from 'src/app/model/student';
import { StudentSchoolFee } from 'src/app/model/student-school-fee';
import { LevelService } from 'src/app/service/level.service';
import { MessageModalService } from 'src/app/service/message-modal.service';
import { NotificationService } from 'src/app/service/notification.service';
import { OptionService } from 'src/app/service/option.service';
import { StudentSchoolFeeService } from 'src/app/service/student-school-fee.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-student-school-fee-form',
  templateUrl: './student-school-fee-form.component.html',
  styleUrls: ['./student-school-fee-form.component.css']
})
export class StudentSchoolFeeFormComponent implements OnInit {

  oneTime: boolean = false;
  multyTime: boolean = false;
  disabled: boolean = false;
  currentYear: any;
  saved: boolean = false;
  value: number;
  options: Option[];
  levels: Level[];
  private isLoading = new BehaviorSubject(false);
  loading$ = this.isLoading.asObservable();
  studentSchoolFeeForm = this.fb.group({
    paymentMode:[,[Validators.required]],
    firstPay: [0],
    secondPay: [0],
    schoolFeeTotal: [0],
    endYear: [, [Validators.required]],
    level: this.fb.group({
      id: [, [Validators.required]]
    }),
    option: this.fb.group({
      id: [, [Validators.required]]
    }),

  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Student,
    public dialogRef: MatDialogRef<StudentSchoolFeeFormComponent>,
    private studentSchoolFeeService: StudentSchoolFeeService,
    private fb: FormBuilder,
    private levelService: LevelService,
    private optionService: OptionService,
    private notifier: NotificationService,
    private messageAleteService: MessageModalService,
    private router: Router,
  ) {
    this.currentYear = new Date().getFullYear();
  }

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
/**
 * 
 * @param $event 
 */
  onChange($event: MatRadioChange) {
    if ($event.value === 1) {
      this.oneTime = true;
      this.multyTime = false;
      this.studentSchoolFeeForm.get('firstPay').disable();
      this.studentSchoolFeeForm.get('secondPay').disable();
    } else {
      this.multyTime = true;
      this.oneTime = false;
      this.studentSchoolFeeForm.get('firstPay').enable();
      this.studentSchoolFeeForm.get('secondPay').enable();
    }
    console.log(this.disabled);
  }
  /**
   * Close modale
   */
  onClose(): void {
    if (!this.saved) {
      this.messageAleteService.confirmMessage("Do you want to discase the change ?");
      this.messageAleteService.checkDiscaseValueAfterCloseModale$().subscribe(
        {
          next: response => {
            if (response) {
              this.messageAleteService.updateValue();
              this.router.navigate(["admin/save-student-school-fee"]);
              this.dialogRef.close();
            } else {
            }
          }
        }
      )
    }
  }
  /**
   * Szve
   * @returns 
   */
  onSave(): void {
    let studentSchoolFee: StudentSchoolFee = {
      payOneTime: this.oneTime,
      payMultiTime: this.multyTime,
      firstPay: this.studentSchoolFeeForm.value.firstPay,
      secondPay: this.studentSchoolFeeForm.value.secondPay,
      thirdPay: 0,
      schoolFeeTotal: this.studentSchoolFeeForm.value.schoolFeeTotal,
      endYear: this.studentSchoolFeeForm.value.endYear,
      student: {
        id: this.data.id,
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        address: this.data.address,
        age: this.data.age,
        dateOfBirth: this.data.dateOfBirth
      },
      level: {
        id: this.studentSchoolFeeForm.value.level.id,
        name: ''
      },
      option: {
        id: this.studentSchoolFeeForm.value.option.id,
        name: '',
        speciality: undefined
      }
    }

    if (this.oneTime) {
      studentSchoolFee.payOneTime=true;
      studentSchoolFee.payMultiTime=false;
      if (this.studentSchoolFeeForm.value.schoolFeeTotal as number == 0) {
        this.notifier.onInfo("Since is one time pay. School fee cannot be 0");
        this.notifier.onInfo("Make sure to provide a value from that field.");
        return;
      }
    }
    if (this.multyTime) {
      studentSchoolFee.payMultiTime=true;
      studentSchoolFee.payOneTime=false;
      if (this.studentSchoolFeeForm.value.firstPay as number == 0) {
        this.notifier.onWarning("Since is multi time pay. First pay cannot be 0");
        this.notifier.onWarning("Make sure to provide a value from that field.");
        return;
      }
    }
    this.saved = true;
    if(studentSchoolFee.endYear < this.currentYear){
      this.notifier.onInfo("Provide valid school year");
      return;
    }
    this.saveStudentSchooFee(studentSchoolFee);

  }

  saveStudentSchooFee(studentSchoolFeeeToSave: StudentSchoolFee): void {
    this.isLoading.next(true);
    this.studentSchoolFeeService.save$(studentSchoolFeeeToSave).subscribe(
      {
        next: (response => {
          this.isLoading.next(false);
          this.notifier.onSuccess(response.message);
          this.dialogRef.close();
        }),
        error: (err: HttpErrorResponse) => {
          console.warn(err.message)
          this.notifier.onError(err.message);
          this.isLoading.next(false);
        }
      }
    )
  }

}


