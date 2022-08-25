import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  newUser: any;
  public userLoggedIn: boolean ;
  public currentUser: any;
  public userStatus:any = {} ;
  public userStatusChanges: BehaviorSubject<any> = new BehaviorSubject(this.userStatus);
  public role: any;

  setUserStatus(userStatus: any):void{
    this.userStatus = userStatus;
    this.userStatusChanges.next(this.userStatus);
  }

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.userLoggedIn = false;
    this.afAuth.onAuthStateChanged((user)=>{
        if(user){
          this.userLoggedIn = true;  
        }else{
          this.userLoggedIn = false;
        }
    })
   }

  getUserState(){
    return  this.afAuth.authState
  }

  singup(user: any): Promise<any>{
    console.log(user,'SINGUP')
    return this.afAuth.createUserWithEmailAndPassword(user.userEmail, user.userPassword)
      .then((result)=>{
        result.user?.updateProfile({
          displayName: user.userName + ' ' + user.userLastName ,
        })
        result.user?.sendEmailVerification();
      })
      .catch(error => {
        console.log('Error: ' + error)
        console.log('Error code: ' + error.code)
        return { isValid: false, message: error.message}
      }); 
  }

  login(email:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then((result)=>{
      this.router.navigate(['/dashboard']);
    })
    .catch(error => {
      console.log('Error: ' + error)
      console.log('Error code: ' + error.code)
      return { isValid: false, message: error.message}
    }); 
  }



  userInvalidCredentials(){
    this.snackbar.open('Los campos ingresados no son validos','', {
      duration: 3000,
      horizontalPosition: 'right',
      panelClass: ['red-snackbar','error-snackbar'],
      verticalPosition: 'bottom',
    })
  }

  userExistSnackbar(){
    this.snackbar.open('El usuario ya existe','', {
      duration: 3000,
      horizontalPosition: 'right',
      panelClass: ['red-snackbar','error-snackbar'],
      verticalPosition: 'bottom',
    })
  }


  
  inserUserData(userCredential: any){
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.userEmail,
      firstname: this.newUser.userName,
      lastname: this.newUser.userLastName,
      role: {user:true}
    })
  }

  getRoles(userCredential: any){
    this.db.doc(`Users/${userCredential.user.uid}`).get()
  }

  logout(){
    this.userStatus = ''
    this.currentUser = null;
    this.setUserStatus(null)
    return this.afAuth.signOut()
  }
}
