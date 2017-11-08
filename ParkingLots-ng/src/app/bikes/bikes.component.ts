import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bike } from '../bike';
import { BikeService } from '../bike.service';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  //styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit {

  bikes: Bike[];

  constructor(private router: Router, private bikeService: BikeService) {

  }

  ngOnInit() {
    this.bikeService.getBikes().then(bikes => this.bikes = bikes);
  }

}
