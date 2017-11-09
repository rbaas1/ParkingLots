import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-parkinglots',
  templateUrl: './parkinglots.component.html',
  styleUrls: ['./parkinglots.component.css']
})
export class ParkinglotsComponent implements OnInit {

  cars: Car[];

  constructor(private router: Router, private carService: CarService) {

  }

  ngOnInit() {
    this.carService.getCars().then(cars => this.cars = cars);
  }

}
