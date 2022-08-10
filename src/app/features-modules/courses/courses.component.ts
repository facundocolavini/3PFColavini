import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesI } from 'src/app/interfaces/courses';

import { CoursesService } from 'src/app/services/courses.service';



@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  public listCourses: Array<CoursesI> = new Array<CoursesI>();

  displayedColumns: string[] = ['name', 'teacher', 'startDate', 'actions'];
  public dataSource :any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private _coursesService: CoursesService,
    public activedRoute: ActivatedRoute,
    private snackbar: MatSnackBar) { }



  ngOnInit(){
    this._coursesService.getAllCourses().subscribe(courses => {
      this.listCourses = courses;
      this.dataSource = new MatTableDataSource(courses)
      this.paginator = this.dataSource.paginator;
      this.sort = this.dataSource.sort
    } )

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteStudent(id:string){
    this._coursesService.deleteStudent(id).then(() => {
      this.snackbar.open('Curso eliminado con exito','', {
        duration: 1500,
        horizontalPosition: 'right',
        verticalPosition: 'bottom', 
      })
      }).catch(() => {
        this.snackbar.open('Ops.. ocurrio un error al eliminar','desaparecer', {
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        })
    })
  }
}
