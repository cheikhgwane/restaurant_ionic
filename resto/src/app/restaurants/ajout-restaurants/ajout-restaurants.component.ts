import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UtilsService } from "src/app/utils.service";
import { Restaurant } from "src/app/Models/restaurant";
import { RestaurantService } from "src/app/service/restaurant.service";

import { MouseEvent } from "@agm/core";
import { AgmMap } from "@agm/core";
import { Plugins } from "@capacitor/core";

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: "app-ajout-restaurants",
  templateUrl: "./ajout-restaurants.component.html",
  styleUrls: ["./ajout-restaurants.component.scss"]
})
export class AjoutRestaurantsComponent implements OnInit {
  ajoutRestoForm: FormGroup;
  lat: any;
  lng: any;
  markers: marker;

  @ViewChild(AgmMap, { static: false })
  public agmMap: AgmMap;
  private markerDraged: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: RestaurantService,
    private route: Router,
    private utils: UtilsService
  ) {
    this.getCurrentPosition();
  }

  getCurrentPosition() {
    Plugins.Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(
      res => {
        (this.lat = res.coords.latitude), (this.lng = res.coords.longitude);
      }
    );
  }

  ngOnInit() {
    this.ajoutRestoForm = this.formBuilder.group({
      nom: [null, [Validators.required, Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  mapClicked($event: MouseEvent) {
    this.markers = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      label: null,
      draggable: true
    };
    console.log(this.markers);
  }

  markerDragEnd($event: MouseEvent) {
    this.markerDraged = true;
    this.markers = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      label: null,
      draggable: true
    };
    console.log("dragEnd", $event);
  }

  postResto(resto: Restaurant) {
    if (resto.nom == null && resto.Description == null) {
      this.utils.presentToast("Champs non remplis", "danger");
      return;
    }

    if (this.markerDraged) {
      resto = Object.assign(resto, {
        Latitude: this.markers.lat,
        Longitude: this.markers.lng
      });

      this.sendRequest(resto);
    } else {
      navigator.geolocation.getCurrentPosition(
        pos => {
          resto = Object.assign(resto, {
            Latitude: pos.coords.latitude,
            Longitude: pos.coords.longitude
          });
          // because the getCurrent position may take time to load
          this.sendRequest(resto);
        },
        err => {
          console.warn(`ERREUR (${err.code}): ${err.message}`);
        },
        { enableHighAccuracy: true }
      );
    }
  }

  sendRequest(resto: Restaurant): void {
    console.log(resto);
    this.service.postRestaurant(resto).subscribe(
      data => {
        this.utils.presentToast("Ajout réussi", "success");
        window.location.reload();
      },
      error => {
        this.utils.presentToast("Erreurs lors de l'ajout", "danger");
      }
    );
  }
}
