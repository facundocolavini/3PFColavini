import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingupComponent implements OnInit {
  public firebaseErrorMessage: string ;

  public loading: boolean = false;
  public userId: any;
  minNum = 6;
   singUpForm : FormGroup;
   
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) {
        this.singUpForm = new FormGroup({
          'userEmail': new FormControl ('',[ Validators.required,Validators.email]),
          'userPassword': new FormControl ('',[Validators.required, Validators.min(this.minNum)]),
          'userName': new FormControl ('', Validators.required),
          'userLastName': new FormControl ('', Validators.required),
        })
    this.firebaseErrorMessage = '';
  }
  
  ngOnInit(): void {

    
  }

  registerUser(){
    console.log(this.singUpForm.value,'values')
    if(this.singUpForm.invalid){
      return;
    }
this.authService.singup(this.singUpForm.value)
  .then((result)=>{
    if(result == null){
        this.router.navigate(['/register/login']);
    }else if(result.isValid == false){
      this.firebaseErrorMessage = result.message;
    }
  }).catch(() => {});
    // let user = this.singUpForm.value
   
    // if(this.singUpForm.valid){
   
    // this.authService.singup(user)
   
      // }
  }

  userInValid(){
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
      verticalPosition: 'bottom',
      
    })
  }

  showSnackbar(){
    this.snackbar.open('Los datos no son correctos','', {
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
