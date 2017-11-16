import { SimulationComponent } from './simulation/simulation.component';

export class Car {

  constructor(id: number, licensePlate: string, colour: string, parkingLot) {

  }

  id: number;
  licensePlate: string;
  colour: string;
  parkingLot = null;
  newParkingLot = null;

  simulationComponent: SimulationComponent;

  timeParked: number = 0;


  setSimComponent(simulationComponent: SimulationComponent){
    this.simulationComponent = simulationComponent;
  }

  leaveParkingLot(){
    //console.log("Car " + this.id + " left and paid " + (this.parkingLot.parkingCost * this.timeParked));

    if(this.simulationComponent.simulatedParkinglots[0].freeSpace > 0){
      this.simulationComponent.addCash(this.parkingLot.parkingCost * this.timeParked);

      //this.parkingLot.id = 0;
      this.timeParked = 0;
      this.simulationComponent.cashflow -= this.parkingLot.parkingCost;

      //this.parkingLot.freeSpace++;

      this.simulationComponent.leaveCar(this);
    }

  }

  park(lot: number){
    //console.log("Car " + this.id + " wants to park in " + lot);

    if(this.simulationComponent.simulatedParkinglots[lot].freeSpace > 0){

      this.newParkingLot = this.simulationComponent.parkinglots[lot];
      this.timeParked = 0;
      this.simulationComponent.cashflow += this.newParkingLot.parkingCost;

      //this.newParkingLot.freeSpace--;

      this.simulationComponent.parkCar(this, lot);

    }



  }

  update(){

    //If parked in an actual lot (not 0)
    if(this.parkingLot.id > 0){
      //console.log("Car " + this.id + " is parked in lot number " + this.parkingLot.id + " for " + this.timeParked + " hours.");
      this.timeParked++;
      if(Math.random() > 0.75){
        this.leaveParkingLot();
      }
    }else{
      if(Math.random() > 0.50){
        var r = Math.floor( Math.random() * (this.simulationComponent.simulatedParkinglots.length - 1) ) + 1;
        if(r == 0){
          r = 1;
        }
        this.park(r);
      }
    }

  }


  printId(){
    console.log("Car id: " + this.id);
  }

}
