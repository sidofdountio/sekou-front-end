import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AssessmentPeriod } from 'src/app/model/assessment-period';
import { NotificationService } from 'src/app/service/notification.service';
import { PeriodeService } from 'src/app/service/periode.service';

@Component({
  selector: 'app-assessment-period',
  templateUrl: './assessment-period.component.html',
  styleUrls: ['./assessment-period.component.css']
})
export class AssessmentPeriodComponent {
  
 
  periodeForm = this.fbuild.group({
    date: ['', [Validators.required]],
    due: ['', [Validators.required]]
  })
  id:number;
  constructor(private fbuild: FormBuilder,
    private router:Router,
    private notifier:NotificationService,
    private periodService:PeriodeService
  ) { }

  onAssessmentPeriod() {
    let id:number;
    let assessmentPeriod:AssessmentPeriod={
      date: this.periodeForm.value.date,
      due: this.periodeForm.value.due
    };

    this.periodService.save$(assessmentPeriod).subscribe({
      next: (response => {
        this.id=response.data.period.id;
        this.notifier.onSuccess(response.message);
        this.router.navigate(["admin/schedule-assessment/",assessmentPeriod.date,assessmentPeriod.due,this.id]);
      }),
      error: any => {
        this.notifier.onError("cannot be able to scheduler assessment.");
      }
    });
    
  }

}
