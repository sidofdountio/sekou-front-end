import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddStudentComponent } from '../add-student/add-student.component';
import { StudentRequest } from 'src/app/model/student-request';
import { Student } from 'src/app/model/student';
import { Gender } from 'src/app/model/enumeration/gender';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, AfterViewInit {

  students: Student[] = [{
    id: 0,
    firstName: 'Jasme',
    lastName: 'Golsing',
    email: '',
    dateOfBirth: undefined,
    level: undefined,
    option: undefined,
    gender: Gender.MALE
  }]

  dataSource = new MatTableDataSource<Student>([]);
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'level', 'option', 'gender', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private router: Router,private studentService:StudentService, private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort =this.sort;
  }
  getStudents():void{
    this.studentService.students$.subscribe(
      response=>{
        this.dataSource.data = response.data.students;
        this.notificationService.onDefault(response.message);
      } ,
      error=>{
        this.notificationService.onError("Student List can' be fetch")
      }
    )
  }

  onSaveStudent() {
    let student: StudentRequest;
    const dialogConf = new MatDialogConfig();
    dialogConf.closeOnNavigation = true;
    dialogConf.autoFocus = true;
    dialogConf.disableClose = true;
    dialogConf.data = student;
    this.dialog.open(AddStudentComponent, dialogConf).afterClosed()
      .subscribe(
        (response: StudentRequest) => {
          console.log(response);
          this.saveStudent(response);
        }
      );
  }

  saveStudent(student:StudentRequest) {
    this.studentService.saveStudent$(student).subscribe(
      response=>{
        this.notificationService.onSuccess(response.message);
        this.notificationService.onDefault("Next Step finish add student details and fee.");
        this.getStudents();
      } ,
      error=>{
        this.notificationService.onError("Student List can' be fetch")
      }
    )
  }
/**
 * view student profile
 * @param student id
 */
  onProfile(id: any) {
    this.router.navigate(["admin/student-profile/",id]);
  }
  /**
   * register a student
   * @param id 
   */
  onRegister(id: any) {
    this.router.navigate(["admin/student-registed/",id]);
  }
/**
 * update a student
 * @param id 
 */
  onUpdate(id: any) {
    this.router.navigate(["admin/student-edit/",id]);
  }

}
