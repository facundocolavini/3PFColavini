import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { StudentI } from 'src/app/interfaces/student';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})


export class AddStudentsComponent implements OnInit {
  sex: any[] = ['Masculino','Femenino'];
  public idUser: string = this.authService.currentUser.uid;
  public myCourses  = [];
  public form: FormGroup;
  public courses = [];
  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private authService: AuthService,
    private coursesService: CoursesService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { 
    this.form =  this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      sex: ['', Validators.required],
      courseSelected: ['', Validators.required]
    })
  }
  openSuccessSnackBar(){
    this.snackbar.open("Estudiante agregado con exito", "OK", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['green-snackbar', 'add-snackbar'],
     });
  }


openFailureSnackBar(){
  this.snackbar.open("No se pudo realizar la operacion", "reintentelo", {
    duration: 3000,
    panelClass: ['red-snackbar','error-snackbar'],
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    });
}
  
  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe(courses => {
      this.courses = courses.map((c: any) =>{
       return c.name;
      })
      console.log(this.courses)

    });
  }

  goBack(){
    this.router.navigate(['/dashboard/students'])
  }
  onAddStudent(){
      const student: StudentI= {
        email: this.form.value.email,
        name: this.form.value.name,
        lastname: this.form.value.lastname,
        sex: this.form.value.sex,
        courseSelected: this.form.value.courseSelected
      }

      /* this.myCourses.push(student.courseSelected) */
      console.log(this.myCourses,'AA')
      this.studentService.addStudent(student).then(() =>{
        this.openSuccessSnackBar()
         this.router.navigate(['/dashboard/students'])

       /*  this.snackbar.open('Estudiante agregado con exito','desaparecer', {
          duration: 2400,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          
        }) */
      }).catch(() => this.openFailureSnackBar());
   
      
  }
}
