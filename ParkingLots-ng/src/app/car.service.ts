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
    var c = {
      "licensePlate": licensePlate,
      "colour": colour
    }

    this.http.post('/api/new/car/', c, {
        })
        //.map(res => res.json())
        .subscribe();

  }



}
