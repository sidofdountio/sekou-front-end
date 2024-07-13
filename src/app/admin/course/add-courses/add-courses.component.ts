import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/service/teacher-service.service';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent {

  onClose() {
    throw new Error('Method not implemented.');
  }
  courseEnrollment: any;
  onSave() {
    throw new Error('Method not implemented.');
  }

}
