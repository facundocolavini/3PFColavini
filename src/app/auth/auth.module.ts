import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { SingupComponent } from './pages/singup/singup.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ProfileComponent } from './pages/profile/profile.component';



@NgModule({

  declarations: [LoginComponent, SingupComponent, ProfileComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,

  ],

})
export class AuthModule { }
