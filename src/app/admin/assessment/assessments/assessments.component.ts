import {LiveAnnouncer} from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { AppState } from 'src/app/model/appState';
import { Assessment } from 'src/app/model/assessment';
import { CustomResponse } from 'src/app/model/custom-response';
import { DataState } from 'src/app/model/enumeration/dataState';
import { AssessmentService } from 'src/app/service/assessment.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css']
})
export class AssessmentsComponent implements OnInit, AfterViewInit {
  readonly DataState = DataState;
  dataSource = new MatTableDataSource<Assessment>([]);
  displayedColumns: string[] = ['id', 'exam', 'day', 'startTime', 'endTime', 'course', 'option', 'level'];
  appState$: Observable<AppState<CustomResponse>>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private assessmentService: AssessmentService,
    private notifier: NotificationService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer
  ) { }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit(): void {
    this.appState$ = this.assessmentService.assessments$.pipe(
      map(response => {
        // this.dataSubject.next(response);
        this.dataSource.data = response.data.assessments;
        this.notifier.onDefault(response.message);
        return { dataState: DataState.LOADED_STATE, appData: response }
      }),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError((error: string) => {
        this.notifier.onError(error);
        return of({ dataState: DataState.ERROR_STATE, error })
      })
    );
  }

  onMoveToPageSaveAssessment() {
    this.router.navigate(["admin/assessment-period"]);
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


}
