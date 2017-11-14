import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Parkinglot } from '../parkinglot';
import { ParkinglotService } from '../parkinglot.service';

@Component({
  selector: 'app-parkinglot-detail',
  templateUrl: './parkinglot-detail.component.html',
  styleUrls: ['./parkinglot-detail.component.css']
})
export class ParkinglotDetailComponent implements OnInit {
  parkinglot: Parkinglot;

  constructor(
    private parkinglotService: ParkinglotService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    //console.log("Details: " + this.route.paramMap.destination.value.id);
    //console.log(this.route.url.value[1].path);

    //this.parkinglotService.getParkinglot(this.route.paramMap.destination.value.id).then(parkinglot => this.parkinglot = parkinglot);
    this.parkinglotService.getParkinglot(this.route.url.value[1].path).then(parkinglot => this.parkinglot = parkinglot);




    // this.route.paramMap
    //   .switchMap((params: ParamMap) => this.parkinglotService.getParkinglot(+params.get('id')))
    //   .subscribe(parkinglot => this.parkinglot = parkinglot);
  }


  goBack(): void {
    this.location.back();
  }

}
