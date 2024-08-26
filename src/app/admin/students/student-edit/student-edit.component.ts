import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/model/enumeration/gender';
import { Student } from 'src/app/model/student';
import { MessageModalService } from 'src/app/service/message-modal.service';
import { NotificationService } from 'src/app/service/notification.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  studentReq = this.fbuilde.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    gender: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]]
  });
  studentId: number;
  student: Student = {
    firstName: '',
    lastName: '',
    email: '',
    level: {
      id: 0,
      name: ''
    },
    gender: undefined,
    dateOfBirth: undefined
  };
  updated: boolean = false;

  constructor(private fbuilde: FormBuilder,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private messageModaleService: MessageModalService,
    private router: Router,
    private notifier: NotificationService
  ) { }

  ngOnInit(): void {
    this.studentId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.studentService.student$(this.studentId).subscribe({
      next: (response => {
        this.student = response.data.student
      }),
      error: (err => {
        console.error("Cannot find student with id %d", this.studentId)
      })
    })
  }

  onCancel(): void {
    if (!this.updated) {
      this.messageModaleService.confirmMessage("Do you want to discase the change ?");
      this.messageModaleService.checkDiscaseValueAfterCloseModale$().subscribe(
        {
          next: response => {
            if (response) {
              this.messageModaleService.updateValue();
              this.router.navigate(["admin/students"]);
            } else {
            }
          }
        }
      )
    }
  }


  onUpdate(): void {
    this.updated = true;
    let studentToUpdate: Student = {
      id: this.student.id,
      firstName: this.studentReq.value.firstName,
      lastName: this.studentReq.value.lastName,
      email: this.studentReq.value.email,
      level: {
        id: this.student.level.id,
        name: this.student.level.name
      },
      dateOfBirth: this.studentReq.value.dateOfBirth as any,
      gender: this.studentReq.value.gender as any,
      option: {
        id: this.student.option.id,
        name: this.student.option.name,
        speciality: {
          id: this.student.option.speciality.id,
          name: this.student.option.speciality.name
        }
      }
    };
    this.updateStudent(studentToUpdate);
  }
  updateStudent(student: Student): void {
    this.studentService.updateStudent$(student).subscribe(
      {
        next: (response => {
          this.notifier.onSuccess(response.message);
        }),
        error: (error => {
          this.notifier.onError("cannot update. Try again")
        })
      }
    )
  }

}
