import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { School } from 'src/app/model/school';
import { NotificationService } from 'src/app/service/notification.service';
import { SchoolService } from 'src/app/service/school.service';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent {
  currentYear: any;
  schooYearForm = this.fb.group({
    schoolYear: [, [Validators.required]],
    schoolName: ['', [Validators.required]],
    shortName: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
    private schoolService: SchoolService,
    private notifier: NotificationService,
    private router:Router
  ) {
    this.currentYear = new Date().getFullYear();
  }

  onSubmit() {
    if (this.schooYearForm.value.schoolYear as number < 0) {
      this.notifier.onWarning("Invalid School Year.");
      return;
    }
    if (this.schooYearForm.value.schoolYear as number < this.currentYear) {
      this.notifier.onWarning("You provided orld year.");
      return;
    }
    let schoolToSave: School = {
      schoolYear: this.schooYearForm.value.schoolYear,
      schoolName: this.schooYearForm.value.schoolName,
      shortName: this.schooYearForm.value.shortName,
      active: true,
      id: undefined
    }
    this.save(schoolToSave);
    console.warn(this.schooYearForm.value);
  }

  save(school:School):void{
    this.schoolService.save$(school).subscribe(
      {
        next:(response=>{
          this.notifier.onSuccess(response.message);
          this.router.navigate(["/admin"])
        }),
        error: (error=>{
          this.notifier.onError("Cannot save")
        })
      }
    )
  }
}
