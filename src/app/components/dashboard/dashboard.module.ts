import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StudentsComponent } from './components/students/students.component';
import { CoursesComponent } from './components/courses/courses.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FormsModule } from '@angular/forms';
import { InscriptionsComponent } from './components/inscriptions/inscriptions.component';
import { AddStudentsComponent } from './components/add-students/add-students.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    StudentsComponent,
    CoursesComponent,
    SidenavComponent,
    InscriptionsComponent,
    AddStudentsComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class DashboardModule { }
