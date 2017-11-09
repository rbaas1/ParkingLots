import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkinglotsComponent } from './parkinglots.component';

describe('ParkinglotsComponent', () => {
  let component: ParkinglotsComponent;
  let fixture: ComponentFixture<ParkinglotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkinglotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkinglotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
