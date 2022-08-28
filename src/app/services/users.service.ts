import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, ObservableInput } from 'rxjs';
import { UserI } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private  firestore:AngularFirestore) {}

   getAllUsers(): ObservableInput<any>{
    return this.firestore.collection('Users').snapshotChanges().pipe(
      map(action => action.map((a => {
        const data = a.payload.doc.data() as UserI;
        const id =  a.payload.doc.id;
        return { id, ...data}
      }))))
  }

  deleteUser(id: string): Promise<any>{
    return this.firestore.collection('Users').doc(id).delete()
  }
  addStudent(student: UserI): Promise<any>{
    return this.firestore.collection('Users').add(student)

  }
  
  editStudent(id: string, student: UserI): Promise<any>{
    return this.firestore.collection('Users').doc(id).update(student)
  }
  getStudentById(id: string) : Observable<any>{
    return this.firestore.collection<UserI>('Users').doc(id).snapshotChanges().pipe(
      map(action => action.payload.data()))
  }
}
