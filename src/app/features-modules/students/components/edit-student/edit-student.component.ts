import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  public sex: any[] = ['Masculino','Femenino'];
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
  
  editStudent(){

  }
}
