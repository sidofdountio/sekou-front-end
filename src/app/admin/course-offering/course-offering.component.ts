import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataState } from 'src/app/model/enumeration/dataState';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/service/notification.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

import { AppState } from 'src/app/model/appState';
import { CustomResponse } from 'src/app/model/custom-response';
import { OptionService } from 'src/app/service/option.service';
import { LevelService } from 'src/app/service/level.service';
import { CourseService } from 'src/app/service/course.service';
import { CourseOfferingServiceService } from 'src/app/service/course-offering-service.service';
import { CourseOffering } from 'src/app/model/course-offering';
import { Level } from 'src/app/model/level';
import { Option } from 'src/app/model/option';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course-offering',
  templateUrl: './course-offering.component.html',
  styleUrls: ['./course-offering.component.css']
})
export class CourseOfferingComponent implements OnInit{
OnExportPDF() {
throw new Error('Method not implemented.');
}
OnExportExcel() {
throw new Error('Method not implemented.');
}

  levels: Level[];
  appState$: Observable<AppState<CustomResponse>>;
  readonly DataSate = DataState;
  private dataSubject: BehaviorSubject<CustomResponse> = new BehaviorSubject<CustomResponse>(null);


  dataSource = new MatTableDataSource<CourseOffering>([]);
  displayedColumns: string[] = ['startTime', 'endTime', 'dayOfWeek', 'course','level','option','year'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  options: Option[];

  constructor(private courseOfferingService: CourseOfferingServiceService,
    private optionService: OptionService,
    private levelService: LevelService,
    private notificationService: NotificationService,
    private courseService: CourseService,
    private router:Router) { }

  ngOnInit(): void {
    this.appState$ = this.courseOfferingService.coursesOfferings$.pipe(
      map(response => {
        this.dataSubject.next(response);
        this.dataSource.data = response.data.courseOfferings;
        this.notificationService.onDefault(response.message);
        return { dataState: DataState.LOADED_STATE, appData: response }
      }),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR_STATE, error })
      })
    );
  }

  // After init
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  // get option
  getOption(): void {
    this.optionService.options$.subscribe(
      {
        next: (response) => {
          this.options = response.data.options;
        },
        error: any => {
        }
      }
    );
  }
  // get LEVEL
  getlEVEL(): void {
    this.levelService.levels$.subscribe(
      {
        next: (response) => {
          this.levels = response.data.levels;
        },
        error: any => {
        }
      }
    );
  }
  // Go on scheduler course
  onSaveCourseOffering() {
    this.router.navigate(["admin/scheduler-course-offering"])
  }


 
}
