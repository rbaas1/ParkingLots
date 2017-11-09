import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Car } from './car'


@Injectable()

export class CarService {

  constructor(private http: Http) {

  }


  private carsUrl = '/api/car/all';

  getCars(): Promise<Car[]> {
    return this.http.get(this.carsUrl)
      .toPromise()
      .then(response => response.json() as Car[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }




  saveCar(licensePlate: string, colour: string) {
    var body = {
      "licensePlate": licensePlate,
      "colour": colour
    }

    return this.http.post('/api/new/car/', body)
      .toPromise()
      .then(resp => {return})
      .catch(this.handleError);

    //.subscribe();

  }

  updateCar(id: number, licensePlate: string, colour: string) {
    var body = {
      "id": id,
      "licensePlate": licensePlate,
      "colour": colour
    }

    return this.http.post('/api/new/car/', body)
      .toPromise()
      .then(resp => {return})
      .catch(this.handleError);

    //.subscribe();

  }



  deleteCar(id: number) {
    console.log("Attempting to delete " + id);
    return this.http.delete('api/car/'+id)
      .toPromise()
      .then(resp => {return})
      .catch(this.handleError);
  }



}
