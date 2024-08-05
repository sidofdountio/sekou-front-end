import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { SettingComponent } from './setting/setting.component';
import { CoursesComponent } from './course/courses/courses.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentRegisteListComponent } from './students/student-registe-list/student-registe-list.component';
import { StudentPrfileComponent } from './students/student-prfile/student-prfile.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { RegisterStudent2Component } from './student/register-student-2/register-student-2.component';
import { CourseOfferingComponent } from './course-offering/course-offering.component';
import { SchedulerCourseOfferingComponent } from './course-offering/scheduler-course-offering/scheduler-course-offering.component';
import { TeachersComponent } from './teacher/teachers/teachers.component';
import { AddTeacherComponent } from './teacher/add-teacher/add-teacher.component';
import { AddAssessmentComponent } from './assessment/add-assessment/add-assessment.component';
import { AssessmentPeriodComponent } from './assessment/assessment-period/assessment-period.component';
import { AssessmentsComponent } from './assessment/assessments/assessments.component';
import { StudentAssessmentListComponent } from './student-assessment-list/student-assessment-list.component';
import { StudentAssessmentComponent } from './student-assessment-list/student-assessment/student-assessment.component';
import { SaveStudentAssessmentComponent } from './student-assessment-list/save-student-assessment/save-student-assessment.component';

const routes: Routes = [
  {
    path: 'admin',
    title: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            component: DashbordComponent
          },
          {
            path: 'assessment-period',
            component: AssessmentPeriodComponent,
            title: 'Assessment-priod'
          },
          {
            path: 'schedule-assessment/:date/:due/:id',
            component: AddAssessmentComponent,
            title: 'Scheduler-Assessment'
          },
          {
            path: 'assessments',
            component: AssessmentsComponent,
            title: 'Assessment'
          },
          {
            path: 'scheduler-course-offering',
            component: SchedulerCourseOfferingComponent,
            title: 'scheduler-course-offering'
          },
          {
            path: 'add-teacher',
            component: AddTeacherComponent,
            title: 'add-teacher'
          },
          {
            path: 'teacher',
            component: TeachersComponent,
            title: 'teachers'
          },
          {
            path: 'course-offering',
            component: CourseOfferingComponent,
            title: 'course-offering'
          },
          {
            path: 'courses',
            component: CoursesComponent,
            title: 'courses'
          },
          {
            path: 'students',
            component: StudentListComponent,
            title: 'students'
          },
          {
            path: 'student-registed/:id',
            component: RegisterStudent2Component,
            title: 'student-registed'
          },
          {
            path: 'student-registed-list',
            component: StudentRegisteListComponent,
            title: 'student-registed'
          },
          {
            path: 'student-profile/:id',
            component: StudentPrfileComponent,
            title: 'student'
          },
          {
            path: 'student-edit/:id',
            component: StudentEditComponent,
            title: 'student'
          },
          {
            path: 'settings',
            component: SettingComponent,
            title: 'settings'
          }, 
          {
            path: 'student-assessment',
            component: StudentAssessmentListComponent,
            title: 'student-assessment'
          },
          {
            path: 'student-assessment-save-first-step',
            component: StudentAssessmentComponent,
            title: 'student-assessment-save-first-step'
          },
          {
            path: 'save-student-assessment/:level/:option/:course/:exam/:year',
            component: SaveStudentAssessmentComponent,
            title: 'save-student-assessment'
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
