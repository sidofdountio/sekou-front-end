import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppState } from 'src/app/model/appState';
import { CustomResponse } from 'src/app/model/custom-response';
import { DataState } from 'src/app/model/enumeration/dataState';
import { SchoolFee } from 'src/app/model/school-fee';
import { SchoolFeeService } from 'src/app/service/school-fee.service';
import {  Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SchoolFeeAddComponent } from '../school-fee-add/school-fee-add.component';

@Component({
  selector: 'app-school-fee-list',
  templateUrl: './school-fee-list.component.html',
  styleUrls: ['./school-fee-list.component.css']
})
export class SchoolFeeListComponent {
  appState$: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  dataSource = new MatTableDataSource<SchoolFee>([]);
  displayedColumns: string[] = ['id', 'totalFee', 'register','level','option'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private schoolFeeService: SchoolFeeService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.appState$ = this.schoolFeeService.schoolFees$.pipe(
      map(response => {
        // this.dataSubject.next(response);
        this.dataSource.data = response.data.schoolFees;
        return { dataState: DataState.LOADED_STATE, appData: response }
      }),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR_STATE, error })
      })
    );
  }

  onOpenModalToSaveSchoolFee(): void {
    let schoolFee:SchoolFee;
    let dialogConfig = new MatDialogConfig();
    dialogConfig.closeOnNavigation = true;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data=schoolFee;
    this.dialog.open(SchoolFeeAddComponent, dialogConfig).afterClosed()
      .subscribe(
        (response: SchoolFee) => {
          if(response != undefined){
           console.log(response);
           this.appState$.subscribe();
          }
        }
      );
  }

  onSaveSchoolFee() {

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
