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
    //console.log("Got cash: $" + n);
    this.cash += n;

  }

  leaveCar(car: Car){

    //console.log(this.simulatedParkinglots[car.parkingLot.id]);
    //console.log(car.parkingLot.freeSpace);

    this.simulatedParkinglots[car.parkingLot.id].freeSpace++;

    this.admin.parkCar(car, 0);

    car.parkingLot = this.parkinglots[0]; //TODO: hier ging die dus fout. Ik zette eerst in cat.ts de ID van de lot direct op 0. Toen kreeg je lotId=0 voor bijv emmen. Verpestte alles.
    //car.parkingLot.freeSpace = car.parkingLot.capacity - car.parkingLot.cars.length;

    this.simulatedParkinglots[car.parkingLot.id].freeSpace--;

    //Update car in simulatedCars: first delete it, then add the updated version
    this.simulatedCars = this.simulatedCars.filter(item => item.id !== car.id);
    this.simulatedCars.push(car);

    this.waitingCars++;





  }

  parkCar(car: Car, lot: number){

    //TODO: redundant debugging code
    // console.log("Car " + car.id + "(" + car.parkingLot.id + ") really wants to park at lot " + lot + "--> " + this.simulatedParkinglots[lot].id);
    // var newLotId = this.parkinglots[lot].id;
    // if(newLotId == 0){
    //   console.log("ERROR!!! simLotId: " + newLotId + ", expected: " + lot);
    //   console.log(car.parkingLot);
    //   console.log("-----------");
    //   this.stop();
    // }
    

    this.simulatedParkinglots[lot].freeSpace--;

    car.parkingLot = this.parkinglots[lot];
    //car.parkingLot.freeSpace = car.parkingLot.capacity - car.parkingLot.cars.length;
    this.admin.parkCar(car, lot);

    // Update car in simulatedCars: first delete it, then add the updated version
    this.simulatedCars = this.simulatedCars.filter(item => item.id !== car.id);
    this.simulatedCars.push(car);

    this.waitingCars--;

    this.simulatedParkinglots[0].freeSpace++;

    //console.log("Car " + car.id + "(" + car.parkingLot.id + ") parked at lot " + lot);

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
  }


  createSimulatedCars(){
    if(this.cars == null) return;
    for(let c of this.cars){


      var t = Object.assign(new Car(null,null,null,null), c);
      t.setSimComponent(this);
      this.simulatedCars.push(t);

    }

  }


  createSimulatedParkinglots(){
    if(this.parkinglots == null) return;
    for(let p of this.parkinglots){
      p.freeSpace = p.capacity - p.cars.length;

      var t = Object.assign(new Parkinglot(null,null,null,null), p);
      this.simulatedParkinglots.push(t);

      this.cashflow += t.parkingCost * t.cars.length;

    }
    this.waitingCars = this.parkinglots[0].cars.length;

  }


}
