import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/interfaces/student';
import { StudentsService } from 'src/app/services/students.service';


@Component({
  selector: 'app-students_DATA',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  listStudents: Student[] = [];
  displayedColumns: string[] = ['email', 'name', 'lastname', 'sex','actions'];
  dataSource!:  MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private studentsService: StudentsService,private snackbar: MatSnackBar) { }


  ngOnInit(): void {
    this.loadStudents()
  }

  loadStudents(){
    this.listStudents = this.studentsService.getStudents();
    this.dataSource = new MatTableDataSource(this.listStudents)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteStudent(index:number){
    console.log(index)
    this.studentsService.deleteStudent(index);
    this.loadStudents();

    this.snackbar.open('Estudiante eliminado con exito','', {
      duration: 1500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      
    })
  }

}
