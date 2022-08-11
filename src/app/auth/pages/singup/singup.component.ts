import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingupComponent implements OnInit {

  public singUpForm: FormGroup 
  public loading: boolean = false;

  constructor(private fb: FormBuilder , private snackbar: MatSnackBar, private router: Router) {
    this.singUpForm = this.fb.group({
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
      userName: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  registerUser(){
    const { userEmail, userPassword } = this.singUpForm.value
    console.log(userEmail, userPassword)
    if (userEmail === 'facu' &&  userPassword === '123' && userEmail ==='facu'){
      this.showLoading()

    }else{
      this.showSnackbar()
      this.singUpForm.reset()
    }
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
