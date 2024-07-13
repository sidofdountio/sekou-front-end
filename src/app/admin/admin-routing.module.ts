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
          }
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
