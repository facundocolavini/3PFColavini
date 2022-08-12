import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public singUpForm: FormGroup 
  public loading: boolean = false;
  public userId: any;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder ,
    private snackbar: MatSnackBar,
    private router: Router
      ) {
    this.singUpForm = this.fb.group({
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
     /*  userName: ['', Validators.required], */
    })
   }

  ngOnInit(): void {

  }

  registerUser(){
    const { userEmail , userPassword } = this.singUpForm.value
    this.authService.registerUser(userEmail, userPassword).then(() => {
      this.showLoading()
      this.userLogedSuccesfull()

    }).catch(() => {
      this.userExistSnackbar()
      this.singUpForm.reset()
    })
  }
  userLogedSuccesfull(){
    this.snackbar.open('Se logeo con exito','', {
      duration: 3000,
      horizontalPosition: 'right',
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
