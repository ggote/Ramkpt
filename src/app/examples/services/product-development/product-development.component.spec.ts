import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDevelopmentComponent } from './product-development.component';

describe('ProductDevelopmentComponent', () => {
  let component: ProductDevelopmentComponent;
  let fixture: ComponentFixture<ProductDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDevelopmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
