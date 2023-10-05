import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mt5ExpertComponent } from './mt5-expert.component';

describe('Mt5ExpertComponent', () => {
  let component: Mt5ExpertComponent;
  let fixture: ComponentFixture<Mt5ExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Mt5ExpertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mt5ExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
