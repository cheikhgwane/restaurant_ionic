import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CompteService } from '../service/compte.service';
import {Compte} from '../Models/compte';

@Component({
  selector: 'app-tab3',
  templateUrl: 'compte.page.html',
  styleUrls: ['compte.page.scss']
})
export class Tab3Page {

  comptes: Compte[];
  constructor(private route: Router, private service: CompteService, private toast : ToastController) {
    this.getEmail();
  }

  async presentToast(message: string,  color: string) {
    const toast = await this.toast.create({
      message: message,
      position: 'top',
      color: color,
      duration: 2000
    });
    toast.present();
  }

  getEmail():void 
  {
    this.service.getEmail().subscribe(comptes =>{
        this.comptes = comptes;
    }, 
    error=>
    { 
      this.presentToast('Erreur survenue','danger');


    });
  }

  modifierMdp (id:any):void
  {
    this.route.navigate(['tabs/compte/modifier',id]);
  }


  logout():void{
    window.localStorage.removeItem('token');
    this.route.navigateByUrl('login')
  }
}
