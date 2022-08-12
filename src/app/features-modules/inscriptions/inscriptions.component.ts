import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { InscriptionI } from 'src/app/interfaces/inscriptions';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.css']
})
export class InscriptionsComponent implements OnInit {

  constructor(
    private inscriptionService: InscriptionService,
    private authService: AuthService
  ) { }

  private inscription: InscriptionI[] = [];
  public isAdmin: any = null;
  public userId: string = '';

  ngOnInit(): void {
    this.getListInscriptions();
    this.getCurrentUser();
  }

  getListInscriptions(){
    this.inscriptionService.getAllInscriptions().subscribe(i => i = this.inscription)

  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        this.userId = auth.uid;
        this.authService.isUserAdmin(this.userId).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole).hasOwnProperty('admin');
        })
      }
    }) 
  }
  onDeleteInscriptions(idInscription: string): void {
    const confirmation = confirm('Seguro que quiere realizar esta accion?');
    if(confirmation){
      this.inscriptionService.deleteInscription(idInscription);
    }
  }
}
