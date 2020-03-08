import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PlatService } from "../../service/plat.service";
import { Router } from "@angular/router";
import { UtilsService } from "../../utils.service";
import { RestaurantService } from "src/app/service/restaurant.service";
import { Restaurant } from "src/app/Models/restaurant";

@Component({
  selector: "app-ajouter",
  templateUrl: "./ajouter.page.html",
  styleUrls: ["./ajouter.page.scss"]
})
export class AjouterPage implements OnInit {
  postPlatForm: FormGroup;
  restaurants: Restaurant[];

  constructor(
    private formBuilder: FormBuilder,
    private service: PlatService,
    private resService: RestaurantService,
    private route: Router,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.postPlatForm = this.formBuilder.group({
      nom: [
        null,
        [Validators.required, Validators.minLength(3), Validators.required]
      ],
      Description: [null, [Validators.required]],
      Prix: [null, [Validators.required]],
      fournisseur: [null, [Validators.required, Validators.minLength(3)]],
      jour: [null, [Validators.required, Validators.minLength(5)]]
    });
    this.getRestaurant();
  }

  getRestaurant(): void {
    this.resService.getResto().subscribe(
      data => {
        this.restaurants = data;
      },
      error => {
        this.utils.presentToast("Erreur survenue", "danger");
      }
    );
  }

  postPlat(platInfo: any) {
    this.service.postPlat(platInfo).subscribe(
      data => {
        this.utils.presentToast("Ajour réussi", "success");
        window.location.reload();
      },
      error => {
        this.utils.presentToast("Plat non ajouté!!!", "danger");
      }
    );
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  compareWith = this.compareWithFn;
}
