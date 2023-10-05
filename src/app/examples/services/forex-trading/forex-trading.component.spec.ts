import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexTradingComponent } from './forex-trading.component';

describe('ForexTradingComponent', () => {
  let component: ForexTradingComponent;
  let fixture: ComponentFixture<ForexTradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForexTradingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForexTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
