import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../service/auth.service';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ToastController } from '@ionic/angular';
import {Router } from '@angular/router';
import {UtilsService} from '../../utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  constructor(private service : AuthService,
  private utils: UtilsService,
  private formBuilder: FormBuilder, private toastController: ToastController,
  private route : Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'identifier' : [null, [Validators.required,Validators.email]],
      'password' : [null, [Validators.required]]
      });
  }

  login(userInfo : any){
    console.log(this.service.redirectUrl);
    this.service.login(userInfo).subscribe(data=>{
    this.service.isAuth = true;
    window.localStorage.setItem('token',data.jwt);
    this.route.navigateByUrl(this.service.redirectUrl);
    },error=>{
    this.utils.presentToast("Nom d'utilisateur ou mot de passe incorrect",'danger');
    });
  }

}

