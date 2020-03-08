import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MapPageRoutingModule } from "./map-routing.module";

import { MapPage } from "./map.page";
import { AgmCoreModule } from "@agm/core";
import { GOOGLE_MAPS_API_KEYS } from "src/environments/environment";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_MAPS_API_KEYS
    })
  ],
  declarations: [MapPage]
})
export class MapPageModule {}
