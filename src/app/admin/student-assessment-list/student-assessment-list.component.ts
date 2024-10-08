import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { AppState } from 'src/app/model/appState';
import { CustomResponse } from 'src/app/model/custom-response';
import { DataState } from 'src/app/model/enumeration/dataState';
import { StudentAssessment } from 'src/app/model/student-assessment';
import { StudentAssessmentService } from 'src/app/service/student-assessment.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Appreciation } from 'src/app/model/enumeration/appreciation';

@Component({
  selector: 'app-student-assessment-list',
  templateUrl: './student-assessment-list.component.html',
  styleUrls: ['./student-assessment-list.component.css']
})
export class StudentAssessmentListComponent implements OnInit, AfterViewInit {
  private dataSubject: BehaviorSubject<CustomResponse> = new BehaviorSubject<CustomResponse>(null);
  readonly appreciation = Appreciation;
  appState$: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  dataSource = new MatTableDataSource<StudentAssessment>([]);
  displayedColumns: string[] = ['id','student','score','appreciation'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private studentAssessmentService: StudentAssessmentService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
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



  onMoveToPageSaveStudentAssessment() {
    this.router.navigate(["admin/student-assessment-save-first-step"])
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
