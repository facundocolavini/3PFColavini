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

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
     ) {
    this.loginForm = this.fb.group({
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  submitLoginForm(){
    const { userEmail, userPassword } = this.loginForm.value
    if(this.loginForm.valid){
      this.authService.loginEmailUser(userEmail, userPassword).then(()=>{
        this.showLoading()
        this.userLogedSuccesfull()
      }).catch(()=>{
        this.userNotExist()
        this.loginForm.reset()
      })
    }else{
      this.showSnackbar()
      this.loginForm.reset()
    }
   
/*     console.log(userEmail, userPassword)
    if (userEmail === 'facu' &&  userPassword === '123'){
      this.showLoading()

    }else{
      this.showSnackbar()
      this.loginForm.reset()
    } */
  }
  userLogedSuccesfull(){
    this.snackbar.open('Se logeo con exito','desaparecer', {
      duration: 3000,
      horizontalPosition: 'right',
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
