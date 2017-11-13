import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { CarsComponent } from '../cars/cars.component';
import { ParkinglotsComponent } from '../parkinglots/parkinglots.component';
import { ParkinglotDetailComponent } from '../parkinglot-detail/parkinglot-detail.component';
import { AdminComponent } from '../admin/admin.component';
import { SimulationComponent } from '../simulation/simulation.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cars', component: CarsComponent},
  { path: 'parkinglots', component: ParkinglotsComponent },
  { path: 'parkinglot/:id', component: ParkinglotDetailComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'simulation', component: SimulationComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
