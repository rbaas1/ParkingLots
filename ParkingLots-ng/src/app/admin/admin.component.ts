import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  cars: Car[];

  constructor(private router: Router, private carService: CarService) {

  }

  ngOnInit() {
    this.carService.getCars().then(cars => this.cars = cars);
  }


  makeCar(){
    this.carService.saveCar(this.generateLicensePlate(), this.generateColour()).then(resp => this.ngOnInit());
  }

  updateCar(id: number, licensePlate: string, colour: string){
    this.carService.updateCar(id, licensePlate, colour).then(resp => this.ngOnInit());
  }

  deleteCar(id: number){
    this.carService.deleteCar(id).then(cars => this.cars = cars).then(resp => this.ngOnInit());
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
