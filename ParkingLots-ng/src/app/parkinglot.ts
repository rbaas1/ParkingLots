import { Car } from './car';

export class Parkinglot {
  constructor(id: number, location: string, capacity: number, parkingCost: number) {

  }

  id: number;
  licensePlate: string;
  capacity: number;
  parkingCost: number;
  cars: Car[];
  freeSpace: number;

  printId(){
    console.log("Parkinglot id: " + this.id);
  }

}
