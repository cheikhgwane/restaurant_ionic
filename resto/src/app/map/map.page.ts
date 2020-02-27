import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsComponent } from '../components/google-maps/google-maps.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild(GoogleMapsComponent, {static: true}) mapComponent: GoogleMapsComponent;

  constructor() { }

  ngOnInit() {
  }

  testMarker(){

    let center = this.mapComponent.map.getCenter();
    this.mapComponent.addMarker(center.lat(), center.lng());
}


}
