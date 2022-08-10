import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentI } from '../interfaces/student';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


export interface StudentID extends StudentI { id: string;}

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
 // private student$ = new Subject<any>();
/*   private studentCollection: AngularFirestoreCollection<StudentI>;
  public students: Observable<StudentI[]> */


  constructor(private  firestore:AngularFirestore) {
/*     this.studentCollection = firestore.collection<StudentI>('students');
    this.students = this.studentCollection.snapshotChanges().pipe(
      map(action => action.map((a => {
        const data = a.payload.doc.data() as StudentI;
        const id =  a.payload.doc.id;
        return { id, ...data}
      })
      ))) */
   }

  getAllStudents(): Observable<any>{
    return this.firestore.collection('students').snapshotChanges().pipe(
      map(action => action.map((a => {
        const data = a.payload.doc.data() as StudentI;
        const id =  a.payload.doc.id;
        return { id, ...data}
      }))))
  }

  deleteStudent(id: string): Promise<any>{
    return this.firestore.collection('students').doc(id).delete()
  }
  addStudent(student: StudentI): Promise<any>{
    return this.firestore.collection('students').add(student)

  }
  
  editStudent(id: string, student: StudentI): Promise<any>{
    return this.firestore.collection('students').doc(id).update(student)
  }
  getStudentById(id: string) : Observable<any>{
    return this.firestore.collection<StudentI>('students').doc(id).snapshotChanges().pipe(
      map(action => action.payload.data()))
  }

/*   addStudentEdit (student: StudentI){
    this.student$.next(student)
  } */

/*   getStudentEdit():Observable<StudentI>{
    return this.student$.asObservable()
  } */
}
