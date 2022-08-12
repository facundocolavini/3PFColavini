import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { InscriptionI } from '../interfaces/inscriptions';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private inscriptionsCollection: AngularFirestoreCollection<InscriptionI>; 

/*     this.studentCollection = firestore.collection<StudentI>('students');
    this.students = this.studentCollection.snapshotChanges().pipe(
      map(action => action.map((a => {
        const data = a.payload.doc.data() as StudentI;
        const id =  a.payload.doc.id;
        return { id, ...data}
      })
      ))) */
/*       private inscriptions: Observable<InscriptionI[]>;
      private inscriptionsDoc: AngularFirestoreDocument<InscriptionI>;
      private inscription: Observable<InscriptionI>;
      public selectedBook: InscriptionI = {
        studentId: null
      }; */

    constructor(private firestore: AngularFirestore) { 
      this.inscriptionsCollection = this.firestore.collection<InscriptionI>('inscriptions');
     

    }
    
   
    
  
    getAllInscriptions(): Observable<InscriptionI[]> {
     
      return this.firestore.collection<InscriptionI>('inscriptions').snapshotChanges()
        .pipe(map(changes => {
          return changes.map(action => {
            const data = action.payload.doc.data() as InscriptionI;
            data.id = action.payload.doc.id;
            return data;
          });
        }));
    }
  
  
    getAllInscriptionOffers() {
      this.inscriptionsCollection = this.firestore.collection('inscriptions', ref => ref.where('oferta', '==', '1'));
      return this.firestore.collection<InscriptionI>('inscriptions').snapshotChanges()
        .pipe(map(changes => {
          return changes.map(action => {
            const data = action.payload.doc.data() as InscriptionI;
            data.id = action.payload.doc.id;
            return data;
          });
        }));
    }
  
    getOneInscription(idInscription: string) :Observable<any>{
      return this.firestore.doc<InscriptionI>(`inscriptions/${idInscription}`)
      .snapshotChanges()
      .pipe(map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as InscriptionI;
          data.id = action.payload.id;
          return data;
        }
      }));
    }
  
    addInscription(inscription: InscriptionI): void {
      this.inscriptionsCollection.add(inscription);
    }
    updateBook(inscriptions: InscriptionI): void {
      let idInscription = inscriptions.id;
     this.firestore.doc<InscriptionI>(`inscriptions/${idInscription}`).update(inscriptions);
    }
    deleteInscription(idInscription: string): void {
      this.firestore.doc<InscriptionI>(`inscriptions/${idInscription}`).delete();
    }
}

