import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Restaurant } from "../Models/restaurant";
import { URL } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  getResto(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(URL + "/restaurants").pipe();
  }

  getOne(id: Number): Observable<Restaurant> {
    return this.http.get<Restaurant>(URL + `/restaurants/${id}`);
  }
  postRestaurant(resto: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(URL + "/restaurants", resto).pipe();
  }

  deleteRestaurant(id: Number): Observable<Restaurant> {
    return this.http.delete<Restaurant>(URL + "/restaurants/" + id).pipe();
  }
  updatePlat(resto: Restaurant, id: Number) {
    return this.http.put<Restaurant>(URL + "/restaurants/" + id, resto).pipe();
  }
}
