import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CoursesI } from 'src/app/interfaces/courses';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  sex: any[] = ['Masculino','Femenino'];
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { 
    this.form =  this.fb.group({
      name: ['', Validators.required],
      teacher: ['', Validators.required],
      startDate: ['', Validators.required],
    })
  }

  ngOnInit(): void {
   
  }
  openSuccessSnackBar(){
    this.snackbar.open("Curso agregado con exito", "OK", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['green-snackbar', 'add-snackbar'],
     });
  }


  openFailureSnackBar(){
    this.snackbar.open("No se pudo realizar la operacion", "desaparecer", {
      duration: 3000,
      panelClass: ['red-snackbar','error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      });
  }

  goBack(){
    this.router.navigate(['/dashboard/courses'])
  }
  onAdd(){
      const student: CoursesI= {
        name: this.form.value.name,
        teacher: this.form.value.teacher,
        startDate: this.form.value.startDate,
      }
      this.coursesService.addStudent(student).then(() =>{
        this.openSuccessSnackBar()
        this.router.navigate(['/dashboard/courses'])
      }).catch(() => this.openFailureSnackBar());   
  }
}
