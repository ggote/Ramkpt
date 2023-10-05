import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mt4ExpertComponent } from './mt4-expert.component';

describe('Mt4ExpertComponent', () => {
  let component: Mt4ExpertComponent;
  let fixture: ComponentFixture<Mt4ExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Mt4ExpertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mt4ExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
