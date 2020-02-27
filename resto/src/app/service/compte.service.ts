import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Compte } from '../Models/compte';
import {URL} from '../../environments/environment';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(private http: HttpClient) { }

  getEmail( ): Observable<Compte[]>{
    return this.http.get<Compte []>(URL+'/comptes').pipe();

  }

  updateMdp( compte: Compte)
  {
    return this.http.put<Compte>(URL+'/comptes/'+compte.id,compte).pipe();
  }

  postCompte( compte : Compte) : Observable<Compte>
  {
    return this.http.post<Compte>(URL+'/comptes',compte).pipe();
  }
}
