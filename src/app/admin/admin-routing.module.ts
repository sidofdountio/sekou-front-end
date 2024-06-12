import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { SettingComponent } from './setting/setting.component';

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
