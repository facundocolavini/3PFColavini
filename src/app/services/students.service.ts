import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  
  listStudents:Student[]=[
    {
      id:'1',
      email: "m@gmail.com",
      name: "Martin",
      lastname: "Perez",
      sex: "M"
    },
    {
      id:'2',
      email: "pai@gmail.com",
      name: "Paula",
      lastname: "Martinez",
      sex: "F"
    },
    {
      id:'3',
      email: "rami@gmail.com",
      name: "Ramiro",
      lastname: "Cabo",
      sex: "M"
    },
    {
      id:'4',
      email: "santi@gmail.com",
      name: "Santiago",
      lastname: "Ramirez",
      sex: "M"
    },
    {
      id:'5',
      email: "pau@gmail.com",
      name: "Paula",
      lastname: "Santos",
      sex: "F"
    },
    {
      id:'6',
      email: "cami@gmail.com",
      name: "Camila",
      lastname: "Gonzales",
      sex: "F"
    },
    {
      id:'7',
      email: "carla@gmail.com",
      name: "Carla",
      lastname: "Jimenez",
      sex: "F"
    },
    {
      id:'8',
      email: "wildcard@gmail.com",
      name: "Wiliam",
      lastname: "Colavini",
      sex: "M"
    },
    {
      id:'9',
      email: "dant@gmail.com",
      name: "Dante",
      lastname: "Alvarez",
      sex: "M"
    },
    {
      id:'10',
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
