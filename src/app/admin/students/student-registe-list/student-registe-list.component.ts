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

@Component({
  selector: 'app-student-registe-list',
  templateUrl: './student-registe-list.component.html',
  styleUrls: ['./student-registe-list.component.css']
})

export class StudentRegisteListComponent implements OnInit, AfterViewInit {


  dataSource = new MatTableDataSource<Register>([]);
  displayedColumns: string[] = ['firstName', 'lastName', 'valid', 'stardDate', 'level', 'option', 'feeRegister', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private router: Router, private registerService: RegisterService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getRegistedStudent();
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this,this.dataSource.paginator = this.paginator;
  }

  getRegistedStudent():void{
    this.registerService.registers$.subscribe(
      response=>{
        this.dataSource.data = response.data.registers;
        this.notificationService.onDefault(response.message);
      }
    )
  }



  OnRegister() {
    let register: Register={
      feeRegister: 0,
      valid: false,
      registerDate: undefined,
      stardDate: 0,
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
      .subscribe((response) => {this.saveRegistration();});
  }
  
  saveRegistration() {

  }


  onProfile(arg0: any) {

  }
  onUpdate(arg0: any) {

  }
  OnExport() {

  }

}
