import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BikesComponent } from './bikes/bikes.component';
import { BikeService } from './bike.service';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { CarsComponent } from './cars/cars.component';
import { CarService } from './car.service';
import { HomeComponent } from './home/home.component';
//import { MaterialModule, MdList, MdListItem } from '@angular/material'


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //MaterialModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    BikesComponent,
    CarsComponent,
    HomeComponent
  ],
  bootstrap: [AppComponent],
  providers: [BikeService, CarService],
})
export class AppModule { }
