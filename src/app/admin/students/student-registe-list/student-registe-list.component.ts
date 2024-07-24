import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Register } from 'src/app/model/register';
import { RegisteStudentComponent } from '../registe-student/registe-student.component';
import { NotificationService } from 'src/app/service/notification.service';
import { RegisterService } from 'src/app/service/register.service';
import { AppState } from 'src/app/model/appState';
import { CustomResponse } from 'src/app/model/custom-response';
import { DataState } from 'src/app/model/enumeration/dataState';
import {BehaviorSubject, Observable , of} from 'rxjs';
import {  map, startWith, catchError } from 'rxjs/operators';
import { RegisterDto } from 'src/app/model/register-dto';
import { HttpErrorResponse } from '@angular/common/http';


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
  readonly DataSate = DataState;
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
  

  /**
   * Method to reigist a student.
   * @constructor
   */
  OnRegister() {
    // registe object
    let register: Register={
      feeRegister: 0,
      valid: false,
      registerDate: undefined,
      startDate: 0,
      endDate: 0,
      student: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: undefined,
        level: {
          id: 0,
          name: ''
        },
        option: {
          id: 0,
          name: '',
          speciality: {
            id: 0,
            name: ''
          }
        }
      }
    };
    const dialogConf = new MatDialogConfig();
    dialogConf.closeOnNavigation = true;
    dialogConf.autoFocus = true;
    dialogConf.disableClose = true;
    dialogConf.data = register;
    this.dialog.open(RegisteStudentComponent, dialogConf).afterClosed()
    .subscribe(response=>{
      if(response !== undefined){
        this.saveRegistration(response);
      }
    })
      
  }

  /**
   * Handler service to save a register.
   */
  saveRegistration(regiterStudent:RegisterDto) {
    this.loading.next(true);
    this.registerService.save$(regiterStudent).subscribe(
      {
        next: (response=>{
          this.notificationService.onSuccess(response.message);
          this.loading.next(false);
          this.appState$.subscribe();
          
        }),
         error : (error:HttpErrorResponse)=>{
          this.notificationService.onError("cannot register");
          console.log("error "+ error);
          this.loading.next(true);
         }
      }
    )
  }


  onProfile(arg0: any) {
  }
  
  onUpdate(arg0: any) {
  }
  // Export register student on excel file
  OnExport() {
  }

  protected readonly DataState = DataState;
}
