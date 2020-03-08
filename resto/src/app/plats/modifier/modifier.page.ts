import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { PlatService } from "../../service/plat.service";
import { Router } from "@angular/router";
import { UtilsService } from "../../utils.service";

@Component({
  selector: "app-modifier",
  templateUrl: "./modifier.page.html",
  styleUrls: ["./modifier.page.scss"]
})
export class ModifierPage implements OnInit {
  updatePlatForm: FormGroup;
  public nom: string;
  public Description: string;
  public fournisseur: string;
  public Prix: number;
  public jour: string;
  platId: number;
  constructor(
    private formBuilder: FormBuilder,
    private service: PlatService,
    private actRoute: ActivatedRoute,
    private utils: UtilsService,
    private route: Router
  ) {
    this.platId = Number(this.actRoute.snapshot.paramMap.get("id"));
    console.log("Id=" + this.platId);
  }

  ngOnInit() {
    this.service
      .getPlat(this.platId)
      .toPromise()
      .then(response => {
        this.nom = response.nom;
        this.Description = response.Description;
        //  this.fournisseur = response.fournisseur;
        this.Prix = response.Prix;
        this.jour = response.jour;
      })
      .catch(err => {
        console.log(err);
      });

    this.updatePlatForm = this.formBuilder.group({
      nom: [null, [Validators.required, Validators.minLength(3)]],
      Description: [null, [Validators.required, Validators.minLength(5)]],
      Prix: [null, [Validators.required, Validators.min(0)]],
      fournisseur: [null, [Validators.required, Validators.minLength(3)]],
      jour: [null, [Validators.required, Validators.minLength(5)]]
    });
  }

  updatePlat(platInfo: any, id: Number) {
    this.service.updatePlat(platInfo, this.platId).subscribe(
      data => {
        this.utils.presentToast("Modification réussie", "success");
        window.location.reload();
      },
      error => {
        this.utils.presentToast("Echec modification!!!", "danger");
      }
    );
  }
}
