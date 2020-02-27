import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlatService } from '../service/plat.service';
import { ToastController } from '@ionic/angular';
import { Plat } from '../Models/plat';

@Component({
  selector: 'app-tab1',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage {

  plats : Plat [];
  constructor(private route : Router, private service: PlatService, private toast : ToastController) {
    this.getPlats();

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

  getPlats():void 
  {
    this.service.getPlats().subscribe(plats =>{
        this.plats = plats;
    }, 
    error=>
    { 
      this.presentToast('Erreur survenue','danger');


    });
  }

//   myRand: number;

// ionViewDidEnter() {
//    this.myRand=this.random();
//   }

//  random(): number {
//    let rand = Math.floor(Math.random()*3)+2;
//    return rand;       
// }

}
