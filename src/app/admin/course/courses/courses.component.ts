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
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { AppState } from 'src/app/model/appState';
import { CustomResponse } from 'src/app/model/custom-response';
import { HttpErrorResponse } from '@angular/common/http';

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

  isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.isLoading.asObservable();
  appState$: Observable<AppState<CustomResponse>>;
  private dataSubject: BehaviorSubject<CustomResponse> = new BehaviorSubject<CustomResponse>(null);
  readonly DataState = DataState;
  dataSource = new MatTableDataSource<CourseEnrollment>([]);
  displayedColumns: string[] = ['title', 'option', 'level', 'credit', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private courseEnrollmentService: CourseEnrollmentService,
    private notificationService: NotificationService,
    private dialog: MatDialog, private courseService: CourseService) { }


  ngOnInit(): void {
    this.appState$ = this.courseEnrollmentService.coursesEnrollements$.pipe(
      map(response => {
        this.dataSubject.next(response);
        this.dataSource.data = response.data.coursesEnrollments;
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
        if (response != undefined) {
          this.saveCourseEnrollment(response);
        }
      }, () => { });
  }

  onDetelete(id: number) {
    this.courseEnrollmentService.deleteCourseEnrollement$(id).subscribe({
      next: (response => {
        this.notificationService.onSuccess(response.message)
      }),
      error: (err => {
        console.warn(err);
        this.notificationService.onError("Cannot delete")
      })
    })
  }
  saveCourseEnrollment(enrollmentCourse: CourseEnrollment) {
    this.isLoading.next(true);
    this.courseEnrollmentService.saveCourseEnrollement$(enrollmentCourse).subscribe(
      {
        next: (response) => {
          this.isLoading.next(false);
          this.appState$.subscribe();
          this.notificationService.onSuccess(response.message);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading.next(false);
          this.notificationService.onError("Cannot save error " + error)
        }
      }
    )
  }

  onSaveCourse() {
    alert("Not yet available !");
  }

}
