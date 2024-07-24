import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppState } from 'src/app/model/appState';
import { Assessment } from 'src/app/model/assessment';
import { CustomResponse } from 'src/app/model/custom-response';
import { DataState } from 'src/app/model/enumeration/dataState';
import { AssessmentService } from 'src/app/service/assessment.service';
import { NotificationService } from 'src/app/service/notification.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html',
  styleUrls: ['./assessment-list.component.css']
})
export class AssessmentListComponent implements OnInit, AfterContentInit {
  appState$: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  private dataSubject: BehaviorSubject<CustomResponse> = new BehaviorSubject<CustomResponse>(null);
  dataSource = new MatTableDataSource<Assessment>([]);
  displayedColumns: string[] = ['title', 'option', 'level'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private assessmentService: AssessmentService,
    private notifier: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.appState$ = this.assessmentService.assessments$.pipe(
      map(response => {
        // this.dataSubject.next(response);
        this.dataSource.data = response.data.assessments;
        return { dataState: DataState.LOADED_STATE, appData: response }
      }),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR_STATE, error })
      })
    );
  }

  ngAfterContentInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }





  // ngOnInit(): void {
  //   this.appState$ = this.assessmentService.assessments$.pipe(
  //     map(response => {
  //       this.dataSubject.next(response);
  //       this.dataSource.data = response.data.assessments;
  //       this.notificationService.onDefault(response.message);
  //       return { dataState: DataState.LOADED_STATE, appData: response }
  //     }),
  //     startWith({ dataState: DataState.LOADING_STATE }),
  //     catchError((error: string) => {
  //       return of({ dataState: DataState.ERROR_STATE, error })
  //     })
  //   );
  // }

  // Go on scheduler course
  onMoveToPageSaveAssessment() {
    this.router.navigate(["admin/assessment-period"]);
  }


}
