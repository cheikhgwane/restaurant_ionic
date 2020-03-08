import {
  Component,
  OnInit,
  ViewChild,
  AfterViewChecked,
  AfterViewInit
} from "@angular/core";
import { AgmMap } from "@agm/core";
import { RestaurantService } from "../service/restaurant.service";
import { UtilsService } from "../utils.service";
import { Plugins } from "@capacitor/core";

interface marker {
  lat: number;
  lng: number;
  label: String;
  draggable: Boolean;
}

@Component({
  selector: "app-map",
  templateUrl: "./map.page.html",
  styleUrls: ["./map.page.scss"]
})
export class MapPage implements AfterViewInit, OnInit {
  @ViewChild(AgmMap, { static: false })
  lat: number;
  lng: number;

  markers: marker[] = [];

  constructor(
    private service: RestaurantService,
    private utils: UtilsService
  ) {}

  ngAfterViewInit() {
    this.getCurrentPosition();
    this.loadResto();
    setTimeout(() => {
      console.log(this.markers);
    }, 3000);
  }
  ngOnInit() {}

  clickedMarker(label: string) {
    this.utils.presentToast(`${label}`, "primary");
  }

  getCurrentPosition() {
    Plugins.Geolocation.getCurrentPosition().then(res => {
      (this.lat = res.coords.latitude), (this.lng = res.coords.longitude);
    });
  }

  loadResto(): void {
    this.service.getResto().subscribe(
      data => {
        for (let d of data) {
          this.markers.push({
            lat: +d.Latitude,
            lng: +d.Longitude,
            label: d.nom,
            draggable: false
          });
        }
      },
      error => {
        this.utils.presentToast(
          "Erreurs lors du chargement des restaurants",
          "danger"
        );
      }
    );
  }
}
