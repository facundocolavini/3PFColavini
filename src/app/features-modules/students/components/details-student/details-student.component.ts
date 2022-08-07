import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-student',
  templateUrl: './details-student.component.html',
  styleUrls: ['./details-student.component.css']
})
export class DetailsStudentComponent implements OnInit {
  sex: any[] = ['Masculino','Femenino'];
  constructor(private router :Router) { }

  ngOnInit(): void {
  }
  backBtn(){


    this.router.navigate(['/dashboard/students'])
    
}
}
