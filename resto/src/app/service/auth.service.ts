import { Injectable } from '@angular/core';
import {Utilisateur} from '../Models/utilisateur';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URL} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;
  isAuth: boolean;
  constructor(private http: HttpClient){}

  login(user: Utilisateur): Observable<any>{
    return this.http.post(URL+'/auth/local',user).pipe();
  }

  register(user: any){
    return this.http.post(URL+'/auth/local/register',user).pipe();
  }


}
