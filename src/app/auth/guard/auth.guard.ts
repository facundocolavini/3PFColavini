import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AngularFireAuth, private router: Router){}
  public role: any;
  public login: boolean = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      return new Promise((resolve,reject) =>{
        this.authService.onAuthStateChanged((user)=>{
          if(user){
            console.log('user LOG', user)
            resolve(true);
          } else {
            console.log('Auth Guard: user is not logged in');
            this.router.navigate(['/register/login']);
            resolve(false);
          }
        })
      })

  }

} 
