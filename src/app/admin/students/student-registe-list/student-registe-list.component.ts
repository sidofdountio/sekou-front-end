import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Register } from 'src/app/model/register';
import { RegisteStudentComponent } from '../registe-student/registe-student.component';

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

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

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
        level: undefined,
        option: undefined
      }
    };
    const dialogConf = new MatDialogConfig();
    dialogConf.closeOnNavigation = true;
    dialogConf.autoFocus = true;
    dialogConf.disableClose = true;
    dialogConf.data = register;
    this.dialog.open(RegisteStudentComponent, dialogConf).afterClosed()
      .subscribe(
        (response) => {
          console.log(response);
          this.saveRegistration();
        }
      );

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
