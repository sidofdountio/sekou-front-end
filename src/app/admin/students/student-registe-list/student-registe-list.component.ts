import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Register } from 'src/app/model/register';
import { NotificationService } from 'src/app/service/notification.service';
import { RegisterService } from 'src/app/service/register.service';
import { AppState } from 'src/app/model/appState';
import { CustomResponse } from 'src/app/model/custom-response';
import { DataState } from 'src/app/model/enumeration/dataState';
import {BehaviorSubject, Observable , of} from 'rxjs';
import {  map, startWith, catchError } from 'rxjs/operators';

/**
 * This component liste register student not save.
 * Registed student mean does whoe has already pay a fee for school year.
 */
@Component({
  selector: 'app-student-registe-list',
  templateUrl: './student-registe-list.component.html',
  styleUrls: ['./student-registe-list.component.css']
})
export class StudentRegisteListComponent implements OnInit, AfterViewInit {
  loading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();
  appState$: Observable<AppState<CustomResponse>>;
  protected readonly DataState = DataState;
  private dataSubject:BehaviorSubject<CustomResponse> = new BehaviorSubject<CustomResponse>(null);
  dataSource = new MatTableDataSource<Register>([]);
  displayedColumns: string[] = ['firstName', 'lastName', 'valid', 'stardDate', 'level', 'option', 'feeRegister', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private router: Router, 
    private registerService: RegisterService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.appState$ = this.registerService.registers$.pipe(
      map(response => {
        this.dataSubject.next(response);
        this.dataSource.data=response.data.registers;
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
    this,this.dataSource.paginator = this.paginator;
  }
 

  

  onProfile(arg0: any) {
  }
  
  onUpdate(arg0: any) {
  }
  // Export register student on excel file
  OnExport() {
  }

  
}
