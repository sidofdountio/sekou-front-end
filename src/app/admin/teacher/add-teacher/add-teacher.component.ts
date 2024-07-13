import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { TeacherDto } from 'src/app/model/teacher-dto';
import { NotificationService } from 'src/app/service/notification.service';
import { TeacherService } from 'src/app/service/teacher-service.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent {

  teacherForm = this.fbuild.group({
    lastName: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.maxLength(9), Validators.required]]
  })
  constructor(private fbuild: FormBuilder, private teacherService: TeacherService,
    private notifier: NotificationService
  ) { }

  onSave() {
    let dto: TeacherDto = {
      lastName: this.teacherForm.value.lastName,
      firstName: this.teacherForm.value.firstName,
      email: this.teacherForm.value.email,
      phone: this.teacherForm.value.phone
    }
    this.teacherService.save$(dto).subscribe(
      {
        next: (response => {
          this.notifier.onSuccess(response.message);
          this.teacherForm.reset();
        }),
        error: HttpErrorResponse => {
          this.notifier.onError("cannot be able to save");
          this.teacherForm.reset();
        }
      }
    )
  }




}
