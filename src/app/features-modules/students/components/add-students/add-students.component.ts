import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentI } from 'src/app/interfaces/student';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})


export class AddStudentsComponent implements OnInit {
  sex: any[] = ['Masculino','Femenino'];
  public form: FormGroup;
  constructor(private fb: FormBuilder, private studentService: StudentsService,private router: Router) { 
    this.form =  this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      sex: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  addStudent(){
      const student: StudentI= {
        email: this.form.value.email,
        name: this.form.value.name,
        lastname: this.form.value.lastname,
        sex: this.form.value.sex,
      }
      this.studentService.addStudent(student);
      this.router.navigate(['/dashboard/students'])
      
  }
}
