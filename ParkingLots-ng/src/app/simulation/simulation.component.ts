import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../car';
import { CarService } from '../car.service';
import { Parkinglot } from '../parkinglot';
import { ParkinglotService } from '../parkinglot.service';

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

  constructor(private router: Router, private carService: CarService, private parkinglotService: ParkinglotService) { }

  ngOnInit() {
    this.carService.getCars().then(cars => this.cars = cars).then(resp => this.createSimulatedCars());
    this.parkinglotService.getParkinglots().then(parkinglots => this.parkinglots = parkinglots).then(resp => this.createSimulatedParkinglots());

  }


  createSimulatedCars(){
    if(this.cars == null) return;
    for(let c of this.cars){


      var t = Object.assign(new Car(null,null,null,null), c);
      this.simulatedCars.push(t);

       t.printId();
      // console.log(t);

    }

  }


  createSimulatedParkinglots(){
    if(this.parkinglots == null) return;
    for(let p of this.parkinglots){
      p.freeSpace = p.capacity - p.cars.length;

      var t = Object.assign(new Parkinglot(null,null,null,null), p);
      this.simulatedParkinglots.push(t);

       t.printId();
      // console.log(t);

    }

  }


}
