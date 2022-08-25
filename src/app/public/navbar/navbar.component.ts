import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user : any;
  public role: any;
  constructor(private authService: AuthService) { }

  public userStatus = this.authService.userStatus;

  ngOnInit() {
    this.authService.userStatusChanges.subscribe(x => console.log(this.userStatus = x))
   this.authService.getUserState().subscribe(u => {
    this.user = u;
  })
  console.log(this.userStatus)
  }
  
  logOutUser(): void {
    this.authService.logout();
  }
}
