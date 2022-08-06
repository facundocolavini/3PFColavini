import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentsComponent } from './components/add-students/add-students.component';
import { CoursesComponent } from './components/courses/courses.component';
import { HomeComponent } from './components/home/home.component';
import { InscriptionsComponent } from './components/inscriptions/inscriptions.component';
import { StudentsComponent } from './components/students/students.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children: [
      {path:'',component:HomeComponent},
      {path:'students',component:StudentsComponent},
      {path:'courses',component:CoursesComponent},
      {path:'inscriptions',component:InscriptionsComponent},
      {path:'create',component:AddStudentsComponent},
    ]
  },
  /* {path:'students', loadChildren:(()=> import('./components/students/students.module').then(m => m.StudentsModule))}, */
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
