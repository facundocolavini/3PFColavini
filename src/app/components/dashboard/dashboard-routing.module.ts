import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { InscriptionsComponent } from './components/inscriptions/inscriptions.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children: [
      {path:'',component:HomeComponent},
      {path:'students',loadChildren: ()=> import('../../features-modules/students/students.module').then(m => m.StudentsModule)},
      {path:'courses',loadChildren: ()=> import('../../features-modules/courses/courses.module').then(m => m.CoursesModule)},
      {path:'inscriptions',component:InscriptionsComponent},
    ]
  },
  /* {path:'students', loadChildren:(()=> import('./components/students/students.module').then(m => m.StudentsModule))}, */
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
