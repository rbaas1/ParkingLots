import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Parkinglot } from './parkinglot'


@Injectable()

export class ParkinglotService {

  constructor(private http: Http) {

  }


  private parkinglotUrl = '/api/parkinglot/all';

  getParkinglot(id: number): Promise<Parkinglot> {
    return this.http.get('/api/parkinglot/'+id)
    .toPromise()
    .then(response => response.json() as Parkinglot)
    .catch(this.handleError);
    //return this.getParkinglots()
    //           .then(parkinglots => parkinglots.find(parkinglot => parkinglot.id === id));
  }

  getParkinglots(): Promise<Parkinglot[]> {
    return this.http.get(this.parkinglotUrl)
      .toPromise()
      .then(response => response.json() as Parkinglot[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


  saveParkinglot(id: number, location: string, capacity: number, cost: number) {
    var body = {
      "id": id,
      "location": location,
      "capacity": capacity,
      "parkingCost": cost
    }

    return this.http.post('/api/new/parkinglot/', body)
      .toPromise()
      .then(resp => {return})
      .catch(this.handleError);

  }

  deleteParkinglot(id: number) {
    console.log("Attempting to delete lot " + id);
    return this.http.delete('api/parkinglot/'+id)
      .toPromise()
      .then(resp => {return})
      .catch(this.handleError);
  }

  // saveCar(licensePlate: string, colour: string) {
  //   var body = {
  //     "licensePlate": licensePlate,
  //     "colour": colour
  //   }
  //
  //   return this.http.post('/api/new/car/', body)
  //     .toPromise()
  //     .then(resp => {return})
  //     .catch(this.handleError);
  //
  // }

  // updateCar(id: number, licensePlate: string, colour: string, parkingLot: number = 0) {
  //   var body = {
  //     "id": id,
  //     "licensePlate": licensePlate,
  //     "colour": colour,
  //     "parkingLot": parkingLot
  //   }
  //
  //   return this.http.post('/api/new/car/', body)
  //     .toPromise()
  //     .then(resp => {return})
  //     .catch(this.handleError);
  //
  //
  // }



  // deleteCar(id: number) {
  //   console.log("Attempting to delete " + id);
  //   return this.http.delete('api/car/'+id)
  //     .toPromise()
  //     .then(resp => {return})
  //     .catch(this.handleError);
  // }



}
