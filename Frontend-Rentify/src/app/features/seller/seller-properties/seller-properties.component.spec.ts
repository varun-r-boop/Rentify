import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPropertiesComponent } from './seller-properties.component';

describe('SellerPropertiesComponent', () => {
  let component: SellerPropertiesComponent;
  let fixture: ComponentFixture<SellerPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerPropertiesComponent]
    });
    fixture = TestBed.createComponent(SellerPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
