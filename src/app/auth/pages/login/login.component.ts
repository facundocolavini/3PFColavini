import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup 
  public loading: boolean = false;
  public firebaseErrorMessage: string ;
  
  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
     ) {
    this.firebaseErrorMessage = '';
    this.loginForm = this.fb.group({
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  submitLoginForm(){
    const { userEmail, userPassword } = this.loginForm.value
    this.loading = true;
    if(this.loginForm.valid){
      this.loading = false;
      this.authService.login(userEmail, userPassword).then((response) =>{
        console.log(response,'response');
        
      if(response?.message == undefined){
        this.userLogedSuccesfull()
        this.loading = false;
      }else{
        this.loading = false;
        this.firebaseErrorMessage = response?.message.replace('Firebase:', '').split('.')[0]
        this.userInvalid(this.firebaseErrorMessage)  
      }

      })

    }
    
  }

  userInvalid(message: string){
    this.snackbar.open(message,'desaparecer', {
      duration: 3000,
      horizontalPosition: 'right',
      panelClass: ['red-snackbar','error-snackbar'],
      verticalPosition: 'bottom',
    })
  }

  userLogedSuccesfull(){
    this.snackbar.open('Se logeo con exito','', {
      duration: 3000,
      horizontalPosition: 'right',
      panelClass: ['green-snackbar', 'add-snackbar'],
      verticalPosition: 'bottom',
    })
  }
  
  userNotExist(){
    this.snackbar.open('El Usuario no existe','desaparecer', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      
    })
  }
  showSnackbar(){
    this.snackbar.open('Usuario o Contraseña invalido','desaparecer', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      
    })
  }

  showLoading(){
    this.loading =true;
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 3000);
  }
}
