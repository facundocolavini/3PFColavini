import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { StudentI } from 'src/app/interfaces/student';
import { StudentsService } from 'src/app/services/students.service';


@Component({
  selector: 'app-students_DATA',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

   public listStudents: StudentI[] = [];
  displayedColumns: string[] = ['email', 'name', 'lastname', 'sex','actions'];
  dataSource!: MatTableDataSource<any>
  public studentId: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private studentsService: StudentsService,
    public activedRoute: ActivatedRoute,
    private snackbar: MatSnackBar) { }


  ngOnInit(): void {
    this.loadStudents()
    this.activedRoute.paramMap.subscribe((param) => {
      this.studentId = param.get('idStudent'); 
    });
    /* console.log(this.studentId) */
  }

  loadStudents(){
    this.studentsService.getAllStudents().subscribe((res) => {
      console.log(res)

      this.dataSource = new MatTableDataSource(res)

    })

   /*  this.dataSource = new MatTableDataSource(this.listStudents) */
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
    this.studentsService.deleteStudent(index);
    this.loadStudents();

    this.snackbar.open('Estudiante eliminado con exito','', {
      duration: 1500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      
    })
  }

/*       //GET Student
      public getStudentById(studentId: string): Observable<Students>{
        let dataUrl = `${this.serverUrl}/students/${studentId}`;
        return this.httpClient.get<Students>(dataUrl).pipe(catchError(this.handleError))
    } */

}
