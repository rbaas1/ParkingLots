export class Car {

  constructor(id: number, licensePlate: string, colour: string, parkingLot: number) {

  }

  id: number;
  licensePlate: string;
  colour: string;
  parkingLot: number;


  printId(){
    console.log("Car id: " + this.id);
  }

}
