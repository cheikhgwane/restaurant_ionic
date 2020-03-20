import { Component, OnInit } from "@angular/core";
import { Restaurant } from "../Models/restaurant";
import { RestaurantService } from "../service/restaurant.service";
import { UtilsService } from "../utils.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.scss"]
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[];
  constructor(
    private route: Router,
    private service: RestaurantService,
    private utils: UtilsService
  ) {
    this.getRestaurant();
  }

  ngOnInit() {
    this.getRestaurant();
  }

  getRestaurant(): void {
    this.service.getResto().subscribe(
      data => {
        this.restaurants = data;
      },
      error => {
        this.utils.presentToast("Erreur survenue", "danger");
      }
    );
  }
  deleteRestaurant(id: Number): void {
    this.service.deleteRestaurant(id).subscribe(
      data => {
        this.utils.presentToast("Restaurant supprimé", "success");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      },
      error => {
        this.utils.presentToast(
          "Erreur survenue lors de la suppression",
          "danger"
        );
      }
    );
  }
}
