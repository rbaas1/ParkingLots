import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkinglotDetailComponent } from './parkinglot-detail.component';

describe('ParkinglotDetailComponent', () => {
  let component: ParkinglotDetailComponent;
  let fixture: ComponentFixture<ParkinglotDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkinglotDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkinglotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
