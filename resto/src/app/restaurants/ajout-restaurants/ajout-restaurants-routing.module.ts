import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AjoutRestaurantsComponent } from "./ajout-restaurants.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: AjoutRestaurantsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutRestaurantsRoutingModule {}
