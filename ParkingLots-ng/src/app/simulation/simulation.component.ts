import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../car';
import { CarService } from '../car.service';
import { Parkinglot } from '../parkinglot';
import { ParkinglotService } from '../parkinglot.service';

import { AdminComponent } from '../admin/admin.component';


@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {

  cars: Car[];
  parkinglots: Parkinglot[];
  //simulatedParkinglots is used to access functions in the Parkinglots class. Created using createSimulatedParkinglots(). Same for cars.
  simulatedParkinglots: Parkinglot[] = [];
  simulatedCars: Car[] = [];

  admin: AdminComponent;

  started = false;
  speed: number = 100;

  cash: number = 0.00;
  cashflow: number = 0.00;
  waitingCars: number = 0;

  day: number = 0;
  hour: number = 0;

  hourInterval = null;

  constructor(private router: Router, private carService: CarService, private parkinglotService: ParkinglotService) {
    this.admin = new AdminComponent(router, carService, parkinglotService);
  }

  ngOnInit() {
    this.carService.getCars().then(cars => this.cars = cars).then(resp => this.createSimulatedCars());
    this.parkinglotService.getParkinglots().then(parkinglots => this.parkinglots = parkinglots).then(resp => this.createSimulatedParkinglots());
  }


  addCash(n: number){
    console.log("Got cash: $" + n);
    this.cash += n;

  }

  leaveCar(car: Car){
    this.admin.updateCar(car.id, car.licensePlate, car.colour, 0);

    this.simulatedCars = this.simulatedCars.filter(item => item.id !== car.id);

    this.waitingCars++;
  }

  start(){
    console.log("Starting simulation");
    this.started = true;
    this.hourInterval = setInterval(function(){
      this.nextHour();
    }.bind(this), this.speed);
  }

  stop(){
    console.log("Stopping simulation");
    clearInterval(this.hourInterval);
    this.started = false;
  }

  nextHour(){
    this.hour++;
    if(this.hour > 23){
      this.hour = 0;
      this.nextDay();
    }

    //Update cars
    for(let car of this.simulatedCars){
      car.update();
    }


  }

  nextDay(){
    this.day++;
    //this.addCash(0.93);
  }


  createSimulatedCars(){
    if(this.cars == null) return;
    for(let c of this.cars){


      var t = Object.assign(new Car(null,null,null,null), c);
      t.setSimComponent(this);
      this.simulatedCars.push(t);

      // t.printId();
      //console.log("Created car: " + t.id + " - parkinglot id: " + t.parkingLot.id);

    }

  }


  createSimulatedParkinglots(){
    if(this.parkinglots == null) return;
    for(let p of this.parkinglots){
      p.freeSpace = p.capacity - p.cars.length;

      var t = Object.assign(new Parkinglot(null,null,null,null), p);
      this.simulatedParkinglots.push(t);

      this.cashflow += t.parkingCost * t.cars.length;

      // t.printId();
      // console.log(t);

    }
    this.waitingCars = this.parkinglots[0].cars.length;

  }


}
