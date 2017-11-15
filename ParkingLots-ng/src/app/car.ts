import { SimulationComponent } from './simulation/simulation.component';

export class Car {

  constructor(id: number, licensePlate: string, colour: string, parkingLot) {

  }

  id: number;
  licensePlate: string;
  colour: string;
  parkingLot = null;

  simulationComponent: SimulationComponent;
  timeParked: number = 0;


  setSimComponent(simulationComponent: SimulationComponent){
    this.simulationComponent = simulationComponent;
  }

  leaveParkingLot(){
    console.log("Car " + this.id + " left and paid " + (this.parkingLot.parkingCost * this.timeParked));


    this.simulationComponent.addCash(this.parkingLot.parkingCost * this.timeParked);

    this.parkingLot.id = 0;
    this.timeParked = 0;
    this.simulationComponent.cashflow -= this.parkingLot.parkingCost;

    this.simulationComponent.leaveCar(this);

  }

  update(){

    //If parked in an actual lot (not 0)
    if(this.parkingLot.id > 0){
      console.log("Car " + this.id + " is parked in lot number " + this.parkingLot.id + " for " + this.timeParked + " hours.");
      this.timeParked++;
      if(Math.random() > 0.95){
        this.leaveParkingLot();
      }
    }

  }


  printId(){
    console.log("Car id: " + this.id);
  }

}
