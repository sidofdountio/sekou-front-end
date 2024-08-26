import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map, startWith, catchError, of } from 'rxjs';
import { AppState } from 'src/app/model/appState';
import { CustomResponse } from 'src/app/model/custom-response';
import { DataState } from 'src/app/model/enumeration/dataState';
import { StudentSchoolFee } from 'src/app/model/student-school-fee';
import { StudentSchoolFeeService } from 'src/app/service/student-school-fee.service';

@Component({
  selector: 'app-student-school-fee-list',
  templateUrl: './student-school-fee-list.component.html',
  styleUrls: ['./student-school-fee-list.component.css']
})
export class StudentSchoolFeeListComponent implements AfterViewInit {
  appState$: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  dataSource = new MatTableDataSource<StudentSchoolFee>([]);
  displayedColumns: string[] = ['id','status','student', 'schoolFeeTotal', 'level', 'option'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router:Router,
    private schoolFeeService: StudentSchoolFeeService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.appState$ = this.schoolFeeService.studentSchoolFees$.pipe(
      map(response => {
        // this.dataSubject.next(response);
        this.dataSource.data = response.data.studentSchoolFees;
        return { dataState: DataState.LOADED_STATE, appData: response }
      }),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR_STATE, error })
      })
    );
  }

  onSaveNewStudentSchoolFee ():void {
    this.router.navigate(["/admin/save-student-school-fee"])
  };
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}