import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    //console.log("Details: " + this.route.paramMap.destination.value.id);
    //console.log(this.router.url);
    var url = this.router.url;
    //console.log(url.substring(12));
    url = url.substring(12);

    this.parkinglotService.getParkinglot(Number(url)).then(parkinglot => this.parkinglot = parkinglot);

    //console.log(this.route.paramMap.destination.value.id);

    //this.parkinglotService.getParkinglot(this.route.paramMap.destination.value.id).then(parkinglot => this.parkinglot = parkinglot);
    //this.parkinglotService.getParkinglot(this.route.url.value[1].path).then(parkinglot => this.parkinglot = parkinglot);




    // this.route.paramMap
    //   .switchMap((params: ParamMap) => this.parkinglotService.getParkinglot(+params.get('id')))
    //   .subscribe(parkinglot => this.parkinglot = parkinglot);
  }


  goBack(): void {
    this.location.back();
  }

}
