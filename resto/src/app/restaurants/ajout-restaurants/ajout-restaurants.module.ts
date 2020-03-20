import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AjoutRestaurantsComponent } from "./ajout-restaurants.component";
import { AjoutRestaurantsRoutingModule } from "./ajout-restaurants-routing.module";
import { GOOGLE_MAPS_API_KEYS } from "src/environments/environment";
import { AgmCoreModule } from "@agm/core";

@NgModule({
  declarations: [AjoutRestaurantsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_MAPS_API_KEYS
    }),
    ReactiveFormsModule,
    AjoutRestaurantsRoutingModule
  ]
})
export class AjoutRestaurantsModule {}
