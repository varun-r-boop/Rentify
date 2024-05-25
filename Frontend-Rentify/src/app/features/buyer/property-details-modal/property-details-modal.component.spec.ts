import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDetailsModalComponent } from './property-details-modal.component';

describe('PropertyDetailsModalComponent', () => {
  let component: PropertyDetailsModalComponent;
  let fixture: ComponentFixture<PropertyDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyDetailsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
