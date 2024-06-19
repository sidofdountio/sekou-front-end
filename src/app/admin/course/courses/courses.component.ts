import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CourseEnrollment } from 'src/app/model/course-enrollment';
import { CourseEnrollmentService } from 'src/app/service/course-enrollment.service';
import { NotificationService } from 'src/app/service/notification.service';
import { EnrollmentCoursesComponent } from '../enrollment-courses/enrollment-courses.component';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

/**
 * This manage List of enrolled course. Not list of course.
 */
export class CoursesComponent implements OnInit, AfterViewInit {


  dataSource = new MatTableDataSource<CourseEnrollment>([]);
  displayedColumns: string[] = ['title', 'option', 'level', 'credit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private courseEnrollmentService: CourseEnrollmentService, private notificationService: NotificationService, private dialog: MatDialog, private courseService: CourseService) { }


  ngOnInit(): void {
    this.getCourseEnrollment();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  // Fetch list
  getCourseEnrollment():void {
    this.courseEnrollmentService.coursesEnrollements$.subscribe(
      (response) => {
        this.dataSource.data = response.data.coursesEnrollments;
        this.notificationService.onSuccess(response.message);
      },
      (error) => {
        this.notificationService.onError("An error occured");
        console.error('error %d', error);
      }
    );
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
      .afterClosed().subscribe((response) => { this.saveCourseEnrollment(response) }, () => { });
  }

  saveCourseEnrollment(enrollmentCourse: CourseEnrollment) {
    this.courseEnrollmentService.saveCourseEnrollement$(enrollmentCourse).subscribe(
      (response) => {
        this.notificationService.onSuccess(response.message);
        this.getCourseEnrollment();
      },
      (error) => {
        this.notificationService.onError("An error ocuure" + error)
      }
    )
  }
  onSaveCourse() {

  }

}
