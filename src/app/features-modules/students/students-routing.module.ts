import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentsComponent } from './components/add-students/add-students.component';
import { DetailsStudentComponent } from './components/details-student/details-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentsComponent } from './students.component';

const routes: Routes = [
  {path: '',
  component:StudentsComponent},
  {path:'create', component: AddStudentsComponent},
  {path:'edit/:idStudent', component: EditStudentComponent},
  {path:'details', component: DetailsStudentComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
