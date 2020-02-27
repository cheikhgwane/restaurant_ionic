import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.page.html',
  styleUrls: ['./modifier.page.scss'],
})
export class ModifierPage implements OnInit {
  compteId : number;
  constructor(
    private route : ActivatedRoute
  ) {
   
    this.compteId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Id="+this.compteId);
  }

  

  ngOnInit() {
  }

}
