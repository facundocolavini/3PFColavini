import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './public/not-found/not-found.component';



const routes: Routes = [
  {path: '', redirectTo:'register', pathMatch:'full'},
  {path: 'register', loadChildren: ()=> import('../app/auth/auth.module').then(m => m.AuthModule)},
  {path: 'notfound', component: NotFoundComponent},
  {path: 'dashboard', loadChildren: ()=> import('./features-modules/dashboard/dashboard.module').then(m => m.DashboardModule)}, // Lazy loading
  {path: '**', redirectTo:'notfound', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
