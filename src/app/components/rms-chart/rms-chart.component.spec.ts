import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsChartComponent } from './rms-chart.component';

describe('RmsChartComponent', () => {
  let component: RmsChartComponent;
  let fixture: ComponentFixture<RmsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
