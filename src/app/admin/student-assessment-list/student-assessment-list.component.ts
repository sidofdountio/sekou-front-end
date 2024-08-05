import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppState } from 'src/app/model/appState';
import { CustomResponse } from 'src/app/model/custom-response';
import { DataState } from 'src/app/model/enumeration/dataState';
import { StudentAssessment } from 'src/app/model/student-assessment';
import { StudentAssessmentService } from 'src/app/service/student-assessment.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-assessment-list',
  templateUrl: './student-assessment-list.component.html',
  styleUrls: ['./student-assessment-list.component.css']
})
export class StudentAssessmentListComponent implements OnInit, AfterContentInit{

  appState$: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  private dataSubject: BehaviorSubject<CustomResponse> = new BehaviorSubject<CustomResponse>(null);
  dataSource = new MatTableDataSource<StudentAssessment>([]);
  displayedColumns: string[] = ['id'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private studentAssessmentService: StudentAssessmentService
  ) { }


  ngOnInit(): void {
    this.appState$ = this.studentAssessmentService.studentSssessments$.pipe(
      map(response => {
        // this.dataSubject.next(response);
        this.dataSource.data = response.data.studentAssessments;
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

  onMoveToPageSaveStudentAssessment() {
    this.router.navigate(["admin/student-assessment-save-first-step"])
  }

}
