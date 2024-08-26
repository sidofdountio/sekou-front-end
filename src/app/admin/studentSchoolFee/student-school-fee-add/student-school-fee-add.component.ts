import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppState } from 'src/app/model/appState';
import { CustomResponse } from 'src/app/model/custom-response';
import { DataState } from 'src/app/model/enumeration/dataState';
import { Student } from 'src/app/model/student';
import { NotificationService } from 'src/app/service/notification.service';
import { StudentService } from 'src/app/service/student.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { StudentSchoolFeeFormComponent } from '../student-school-fee-form/student-school-fee-form.component';

@Component({
  selector: 'app-student-school-fee-add',
  templateUrl: './student-school-fee-add.component.html',
  styleUrls: ['./student-school-fee-add.component.css']
})
export class StudentSchoolFeeAddComponent implements OnInit, AfterViewInit {

  // Object
  students: Student[] = [];
  readonly DataSate = DataState;
  protected readonly DataState = DataState;
  private dataSubject: BehaviorSubject<CustomResponse> = new BehaviorSubject<CustomResponse>(null);
  dataSource = new MatTableDataSource<Student>([]);
  appState$: Observable<AppState<CustomResponse>>;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'level', 'option', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private studentService: StudentService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onOPenmModale(student: Student) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = student;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    this.dialog.open(StudentSchoolFeeFormComponent, dialogConfig).afterClosed()
      .subscribe(
        response => {
          if (response === undefined) {
          }
        });
  }


}
