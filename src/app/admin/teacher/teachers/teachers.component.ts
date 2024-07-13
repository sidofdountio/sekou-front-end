import { Component, ViewChild } from '@angular/core';
import { TeacherService } from 'src/app/service/teacher-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataState } from 'src/app/model/enumeration/dataState';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/service/notification.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppState } from 'src/app/model/appState';
import { CourseOffering } from 'src/app/model/course-offering';
import { CustomResponse } from 'src/app/model/custom-response';
import { Teacher } from 'src/app/model/teacher';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent {

  appState$: Observable<AppState<CustomResponse>>;
  readonly DataSate = DataState;
  private dataSubject: BehaviorSubject<CustomResponse> = new BehaviorSubject<CustomResponse>(null);


  dataSource = new MatTableDataSource<Teacher>([]);
  displayedColumns: string[] = ['name', 'email', 'phone'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private teacherService:TeacherService,
    private notificationService: NotificationService,
    private router: Router) { }


  ngOnInit(): void {
    this.appState$ = this.teacherService.teachers$.pipe(
      map(response => {
        // this.dataSubject.next(response);
        this.dataSource.data = response.data.teachers;
        this.notificationService.onDefault(response.message);
        return { dataState: DataState.LOADED_STATE, appData: response }
      }),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR_STATE, error })
      })
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  addTeacher() {
    this.router.navigate(["admin/add-teacher"])
    }
}
