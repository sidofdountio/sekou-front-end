import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WebsiteComponent } from './website/website.component';
import {MobileComponent} from "./mobile/mobile.component";

const routes: Routes = [
  {
    component: MobileComponent,
    path: 'online-registration',
    title: 'online-registration'

  },
  {
    path: 'home',
    component: WebsiteComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'

  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    title: 'Page-not-found'
  },
  {
    path: '**',
    redirectTo: '/page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
