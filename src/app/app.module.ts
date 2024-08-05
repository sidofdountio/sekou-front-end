import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { NotifierModule } from 'angular-notifier';
import {MatDialogModule} from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WebsiteComponent } from './website/website.component';
import { MessageModaleComponent } from './util/message-modale/message-modale.component';
import { MobileComponent } from './mobile/mobile.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WebsiteComponent,
    MessageModaleComponent,
    MobileComponent,
  ],
    imports: [
      MatDialogModule,
        NotifierModule,
        MatButtonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AdminModule,
        AppRoutingModule,
        MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
