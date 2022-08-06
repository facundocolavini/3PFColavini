import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup 
  public loading: boolean = false;

  constructor(private fb: FormBuilder , private snackbar: MatSnackBar, private router: Router) {
    this.loginForm = this.fb.group({
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  submitLoginForm(){
    const { userEmail, userPassword } = this.loginForm.value
    console.log(userEmail, userPassword)
    if (userEmail === 'facu' &&  userPassword === '123'){
      this.showLoading()

    }else{
      this.showSnackbar()
      this.loginForm.reset()
    }
  }

  showSnackbar(){
    this.snackbar.open('Usuario o Contraseña invalido','', {
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
