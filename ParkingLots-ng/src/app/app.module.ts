import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { CarsComponent } from './cars/cars.component';
import { CarService } from './car.service';
import { HomeComponent } from './home/home.component';
import { ParkinglotsComponent } from './parkinglots/parkinglots.component';
import { ParkinglotService } from './parkinglot.service';
import { AdminComponent } from './admin/admin.component';
import { SimulationComponent } from './simulation/simulation.component';
import { ParkinglotDetailComponent } from './parkinglot-detail/parkinglot-detail.component';
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
    CarsComponent,
    HomeComponent,
    ParkinglotsComponent,
    AdminComponent,
    SimulationComponent,
    ParkinglotDetailComponent
  ],
  bootstrap: [AppComponent],
  providers: [CarService, ParkinglotService],
})
export class AppModule { }
