import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../car';
import { CarService } from '../car.service';
import { Parkinglot } from '../parkinglot';
import { ParkinglotService } from '../parkinglot.service';


@Component({
  selector: 'app-parkinglots',
  templateUrl: './parkinglots.component.html',
  styleUrls: ['./parkinglots.component.css']
})
export class ParkinglotsComponent implements OnInit {

  cars: Car[];
  parkinglots: Parkinglot[];
  //simulatedParkinglots is used to access functions in the Parkinglots class. Created using createSimulatedParkinglots()
  simulatedParkinglots: Parkinglot[] = [];

  constructor(private router: Router, private carService: CarService, private parkinglotService: ParkinglotService) {

  }

  ngOnInit() {
    this.carService.getCars().then(cars => this.cars = cars);
    this.parkinglotService.getParkinglots().then(parkinglots => this.parkinglots = parkinglots).then(resp => this.createSimulatedParkinglots());

  }



  createSimulatedParkinglots(){
    if(this.parkinglots == null) return;
    for(let p of this.parkinglots){
      p.freeSpace = p.capacity - p.cars.length;

      var t = Object.assign(new Parkinglot(null,null,null,null), p);
      this.simulatedParkinglots.push(t);

      // t.printId();
      // console.log(t);

    }

  }




  gotoDetail(id: number): void {
    this.router.navigate(['/parkinglot', id]);
  }

}
