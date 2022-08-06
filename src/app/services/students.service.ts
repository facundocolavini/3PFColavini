import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  
  listStudents:Student[]=[
    {
      email: "m@gmail.com",
      name: "Martin",
      lastname: "Perez",
      sex: "M"
    },
    {
      email: "pai@gmail.com",
      name: "Paula",
      lastname: "Martinez",
      sex: "F"
    },
    {
      email: "rami@gmail.com",
      name: "Ramiro",
      lastname: "Cabo",
      sex: "M"
    },
    {
      email: "santi@gmail.com",
      name: "Santiago",
      lastname: "Ramirez",
      sex: "M"
    },
    {
      email: "pau@gmail.com",
      name: "Paula",
      lastname: "Santos",
      sex: "F"
    },
    {
      email: "cami@gmail.com",
      name: "Camila",
      lastname: "Gonzales",
      sex: "F"
    },
    {
      email: "carla@gmail.com",
      name: "Carla",
      lastname: "Jimenez",
      sex: "F"
    },
    {
      email: "wildcard@gmail.com",
      name: "Wiliam",
      lastname: "Colavini",
      sex: "M"
    },
    {
      email: "dant@gmail.com",
      name: "Dante",
      lastname: "Alvarez",
      sex: "M"
    },
    {
      email: "fedeb@gmail.com",
      name: "Federico",
      lastname: "Bustos",
      sex: "M"
    }
  ]

  constructor() { }

  getStudents(){
    return this.listStudents.slice() // Copia del listado de students
  }

  deleteStudent(index: number){
    this.listStudents.splice(index,1) // splice(Desde,Cuantos)
  }
  addStudent(student: Student){
    this.listStudents.unshift(student)
  }
}
