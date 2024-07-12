import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTreeModule} from '@angular/material/tree'; 
import { MatMenuModule } from '@angular/material/menu';




import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashbordComponent } from './dashbord/dashbord.component';
import { SettingComponent } from './setting/setting.component';
import { CoursesComponent } from './course/courses/courses.component';
import { AddCoursesComponent } from './course/add-courses/add-courses.component';
import { EnrollmentCoursesComponent } from './course/enrollment-courses/enrollment-courses.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { StudentPrfileComponent } from './students/student-prfile/student-prfile.component';
import { RegisteStudentComponent } from './students/registe-student/registe-student.component';
import { StudentRegisteListComponent } from './students/student-registe-list/student-registe-list.component';
import { StudentTreeComponent } from './students/student-tree/student-tree.component';
import { AddStudentComponent } from './students/add-student/add-student.component';
import {MatCardModule} from '@angular/material/card';
import { RegisterStudent2Component } from './student/register-student-2/register-student-2.component'; 


@NgModule({
  declarations: [
    AdminComponent,
    DashbordComponent,
    SettingComponent,
    CoursesComponent,
    AddCoursesComponent,
    EnrollmentCoursesComponent,
    StudentListComponent,
    StudentEditComponent,
    StudentPrfileComponent,
    RegisteStudentComponent,
    StudentRegisteListComponent,
    StudentTreeComponent,
    AddStudentComponent,
    RegisterStudent2Component
  ],
  imports: [
    MatCardModule,
    MatMenuModule,
    MatTreeModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatTooltipModule,
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
