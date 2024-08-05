import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddStudentComponent } from '../add-student/add-student.component';
import { StudentRequest } from 'src/app/model/student-request';
import { Student } from 'src/app/model/student';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';
import { NotificationService } from 'src/app/service/notification.service';
import { AppState } from 'src/app/model/appState';
import { CustomResponse } from 'src/app/model/custom-response';
import { DataState } from 'src/app/model/enumeration/dataState';
import {BehaviorSubject, Observable , of} from 'rxjs';
import {  map, startWith, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, AfterViewInit {

  // Object
  students: Student[] = [];
  readonly DataSate = DataState;
  private dataSubject:BehaviorSubject<CustomResponse> = new BehaviorSubject<CustomResponse>(null);
  dataSource = new MatTableDataSource<Student>([]);
  appState$: Observable<AppState<CustomResponse>>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'level', 'option', 'gender', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private router: Router,private studentService:StudentService, private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.appState$ = this.studentService.students$.pipe(
      map(response => {
        this.dataSubject.next(response);
        this.dataSource.data=response.data.students;
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
    this.dataSource.sort =this.sort;
  }


  onSaveStudent() {
    let student: StudentRequest;
    const dialogConf = new MatDialogConfig();
    dialogConf.closeOnNavigation = true;
    dialogConf.autoFocus = true;
    dialogConf.disableClose = true;
    dialogConf.data = student;
    this.dialog.open(AddStudentComponent, dialogConf).afterClosed()
      .subscribe(
        (response: StudentRequest) => {

          if(response != undefined){
            this.saveStudent(response);
          }
        }
      );
  }

  saveStudent(student:StudentRequest) {
    this.studentService.saveStudent$(student).subscribe(
      {
        next: (response)=>{
          this.notificationService.onSuccess(response.message);
            this.notificationService.onWarning("Next Step finish add student details and fee.");
            this.appState$.subscribe();
        },
        error: (error: any)=>{
          this.notificationService.onWarning("Can't save action ");
        }
      }
    );
  }
/**
 * view student profile
 * @param student id
 */
  onProfile(id: any) {
    this.router.navigate(["admin/student-profile/",id]);
  }
  /**
   * register a student
   * @param id
   */
  onRegister(id: any) {
    this.router.navigate(["admin/student-registed/",id]);
  }
/**
 * update a student
 * @param id
 */
  onUpdate(id: any) {
    this.router.navigate(["admin/student-edit/",id]);
  }

  protected readonly DataState = DataState;
}
