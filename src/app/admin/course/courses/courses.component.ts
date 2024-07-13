import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseEnrollmentService } from 'src/app/service/course-enrollment.service';
import { EnrollmentCoursesComponent } from '../enrollment-courses/enrollment-courses.component';
import { CourseService } from 'src/app/service/course.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataState } from 'src/app/model/enumeration/dataState';
import { MatTableDataSource } from '@angular/material/table';
import { CourseEnrollment } from 'src/app/model/course-enrollment';
import { NotificationService } from 'src/app/service/notification.service';
import {BehaviorSubject, Observable , of} from 'rxjs';
import {  map, startWith, catchError } from 'rxjs/operators';

import { AppState } from 'src/app/model/appState';
import { CustomResponse } from 'src/app/model/custom-response';

/**
 * This component will create couse liste course and have add button to enrolle course.
 */
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

/**
 * This manage List of enrolled course. Not list of course.
 */
export class CoursesComponent implements OnInit, AfterViewInit {
  appState$: Observable<AppState<CustomResponse>>;
  readonly DataSate = DataState;
  private dataSubject:BehaviorSubject<CustomResponse> = new BehaviorSubject<CustomResponse>(null);


  dataSource = new MatTableDataSource<CourseEnrollment>([]);
  displayedColumns: string[] = ['title', 'option', 'level', 'credit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private courseEnrollmentService: CourseEnrollmentService, 
              private notificationService: NotificationService,
              private dialog: MatDialog, private courseService: CourseService) { }


  ngOnInit(): void {
    this.appState$ = this.courseEnrollmentService.coursesEnrollements$.pipe(
      map(response => {
        // this.dataSubject.next(response);
        this.dataSource.data=response.data.coursesEnrollments;
        return { dataState: DataState.LOADED_STATE, appData: response }
      }),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR_STATE , error})
      })
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }
  /**
   * Triger dialog componnent to fell @param CourseEnrollment
   */
  onSaveCourseEnrollment() {
    let enrollmentCourse: CourseEnrollment;
    const dialogConf = new MatDialogConfig();
    dialogConf.closeOnNavigation = true;
    dialogConf.autoFocus = true;
    dialogConf.disableClose = true;
    dialogConf.data = enrollmentCourse;
    const dialog = this.dialog.open(EnrollmentCoursesComponent, dialogConf)
      .afterClosed().subscribe((response) => { 
        if(response != undefined){
          this.saveCourseEnrollment(response);
        }
      }, () => { });
  }

  saveCourseEnrollment(enrollmentCourse: CourseEnrollment) {
    this.courseEnrollmentService.saveCourseEnrollement$(enrollmentCourse).subscribe(
      (response) => {
        this.notificationService.onSuccess(response.message);

      },
      (error) => {
        this.notificationService.onError("An error ocuure" + error)
      }
    )
  }
  onSaveCourse() {

  }

  protected readonly DataState = DataState;
}
