import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RestaurantsComponent } from "./restaurants.component";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [RestaurantsComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: RestaurantsComponent }])
  ]
})
export class RestaurantsModule {}
