import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: Car[];

  constructor(private router: Router, private carService: CarService) {

  }

  ngOnInit() {
    this.carService.getCars().then(cars => this.cars = cars);
  }

  makeCar(){
    this.carService.saveCar(this.generateLicensePlate(), this.generateColour());
  }

  //TODO: make into function instead of having to use this.
  generateLicensePlate(): string{
    var possibleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var possibleNumbers = "0123456789";
    return "" + possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length))
              + possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length))
              + "-"
              + possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length))
              + possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length))
              + "-"
              + possibleNumbers.charAt(Math.floor(Math.random() * possibleNumbers.length))
              + possibleNumbers.charAt(Math.floor(Math.random() * possibleNumbers.length));

  }

  generateColour(): string{
    return this.rgbToHex(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
  }

  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }
  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

}
