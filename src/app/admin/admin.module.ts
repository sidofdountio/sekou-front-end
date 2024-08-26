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
import { EnrollmentCoursesComponent } from './course/enrollment-courses/enrollment-courses.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { StudentPrfileComponent } from './students/student-prfile/student-prfile.component';
import { StudentRegisteListComponent } from './students/student-registe-list/student-registe-list.component';
import { StudentTreeComponent } from './students/student-tree/student-tree.component';
import { AddStudentComponent } from './students/add-student/add-student.component';
import {MatCardModule} from '@angular/material/card';
import { CourseOfferingComponent } from './course-offering/course-offering.component';
import { SchedulerCourseOfferingComponent } from './course-offering/scheduler-course-offering/scheduler-course-offering.component';
import { TeachersComponent } from './teacher/teachers/teachers.component';
import { AddTeacherComponent } from './teacher/add-teacher/add-teacher.component';
import { EditTeacherComponent } from './teacher/edit-teacher/edit-teacher.component';
import { AddAssessmentComponent } from './assessment/add-assessment/add-assessment.component';
import { EditeAssessmentComponent } from './assessment/edite-assessment/edite-assessment.component';
import { AssessmentPeriodComponent } from './assessment/assessment-period/assessment-period.component';
import { AssessmentsComponent } from './assessment/assessments/assessments.component';
import { StudentAssessmentComponent } from './student-assessment-list/student-assessment/student-assessment.component';
import { StudentAssessmentListComponent } from './student-assessment-list/student-assessment-list.component';
import { StudentAssessmentAddComponent } from './student-assessment-list/student-assessment-add/student-assessment-add.component';
import { SaveStudentAssessmentComponent } from './student-assessment-list/save-student-assessment/save-student-assessment.component';
import { SchoolFeeListComponent } from './schoolFee/school-fee-list/school-fee-list.component';
import { SchoolFeeAddComponent } from './schoolFee/school-fee-add/school-fee-add.component';
import { SchoolFeeEditComponent } from './schoolFee/school-fee-edit/school-fee-edit.component';
import { StudentSchoolFeeListComponent } from './studentSchoolFee/student-school-fee-list/student-school-fee-list.component';
import { StudentSchoolFeeAddComponent } from './studentSchoolFee/student-school-fee-add/student-school-fee-add.component';
import { StudentSchoolFeeEditComponent } from './studentSchoolFee/student-school-fee-edit/student-school-fee-edit.component';
import { StudentSchoolFeeFormComponent } from './studentSchoolFee/student-school-fee-form/student-school-fee-form.component';
import { CustomPipe } from 'custorm.pipe';
import { RegisterStudent2Component } from './students/register-student-2/register-student-2.component';

@NgModule({
  declarations: [
    
    AdminComponent,
    DashbordComponent,
    SettingComponent,
    CoursesComponent,
    EnrollmentCoursesComponent,
    StudentListComponent,
    StudentEditComponent,
    StudentPrfileComponent,
    StudentRegisteListComponent,
    StudentTreeComponent,
    AddStudentComponent,
    RegisterStudent2Component,
    CourseOfferingComponent,
    SchedulerCourseOfferingComponent,
    TeachersComponent,
    AddTeacherComponent,
    EditTeacherComponent,
    AddAssessmentComponent,
    EditeAssessmentComponent,
    AssessmentPeriodComponent,
    AssessmentsComponent,
    StudentAssessmentComponent,
    StudentAssessmentListComponent,
    StudentAssessmentAddComponent,
    SaveStudentAssessmentComponent,
    SchoolFeeListComponent,
    SchoolFeeAddComponent,
    SchoolFeeEditComponent,
    StudentSchoolFeeListComponent,
    StudentSchoolFeeAddComponent,
    StudentSchoolFeeEditComponent,
    StudentSchoolFeeFormComponent,
    CustomPipe

  ],
  imports: [
    MatRadioModule,
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
