import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/model/appState';
import { CustomResponse } from 'src/app/model/custom-response';
import { DataState } from 'src/app/model/enumeration/dataState';
import { Student } from 'src/app/model/student';
import { StudentAssessment } from 'src/app/model/student-assessment';
import { StudentAssessmentService } from 'src/app/service/student-assessment.service';
import { StudentService } from 'src/app/service/student.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentAssessmentAddComponent } from '../student-assessment-add/student-assessment-add.component';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-save-student-assessment',
  templateUrl: './save-student-assessment.component.html',
  styleUrls: ['./save-student-assessment.component.css']
})
export class SaveStudentAssessmentComponent implements OnInit, AfterViewInit {
  isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.isLoading.asObservable();
  readonly DataState = DataState;
  private dataSubject: BehaviorSubject<CustomResponse> = new BehaviorSubject<CustomResponse>(null);
  dataSource = new MatTableDataSource<Student>([]);
  appState$: Observable<AppState<CustomResponse>>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'level', 'option', 'gender', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  levelId: number;
  optionId: number;
  courseId: number;
  exam: string;
  year: number;
  constructor(private route: ActivatedRoute,
    private studentAssementService: StudentAssessmentService,
    private studentService: StudentService,
    private dialog: MatDialog,
    private notifier:NotificationService
  ) { }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.levelId = parseInt(this.route.snapshot.paramMap.get("level"));
    this.optionId = parseInt(this.route.snapshot.paramMap.get("option"));
    this.courseId = parseInt(this.route.snapshot.paramMap.get("course"));
    this.exam = this.route.snapshot.paramMap.get("exam");
    this.year = parseInt(this.route.snapshot.paramMap.get("year"));

    this.appState$ = this.studentService.students$.pipe(
      map(response => {
        this.dataSubject.next(response);
        this.dataSource.data = response.data.students;
        return { dataState: DataState.LOADED_STATE, appData: response }
      }),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR_STATE, error })
      })
    );

  }

  onOpenModalToGetStudentScore(student:Student) {
    let score:number=0;
    const dialogConf = new MatDialogConfig();
    dialogConf.closeOnNavigation = true;
    dialogConf.autoFocus = true;
    dialogConf.disableClose = true;
    dialogConf.data = score;
    this.dialog.open(StudentAssessmentAddComponent, dialogConf).afterClosed()
      .subscribe(
        (response) => {
          if(response == undefined){                                                              
          }else{
            console.log(response);
            this.onSaveStudentAssessment(student,response.score,response.feedback)
          }
        }
      );
  }

  // Method to save student assessment
  onSaveStudentAssessment(student: Student,score:number,feedback:string) {
    let studentAssessment: StudentAssessment = {
      id: 0,
      year: undefined,
      level: {
        id:  this.levelId,
        name: ''
      },
      option: {
        id: this.optionId,
        name: ''
      },
      course: {
        id: this.courseId,
        title: '',
        credit: 0
      },
      assessmentType: this.exam as any,
      student: {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        dateOfBirth: student.dateOfBirth,
        email: student.email,
        gender: student.gender,
        level: {
          id: student.level.id,
          name: student.level.name
        },
        option:{
          id: student.option.id,
          name:student.option.name
        }    
      },
      feedback: feedback,
      score: score
    }
    this.isLoading.next(true);
    this.studentAssementService.save$(studentAssessment).subscribe(
      {
        next: (
          response=>{
            this.notifier.onSuccess(response.message);
            this.isLoading.next(false);
          }
        ),
        error: (error=>{
          this.notifier.onError("Cannot save an error");
          this.isLoading.next(false);
        })
      }
    )
  }

}
