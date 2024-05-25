import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../../services/seller.service';
import { ContactDetails, Property } from '../../model/seller.model';

@Component({
  selector: 'app-property-details-modal',
  standalone: true,
  imports: [],
  templateUrl: './property-details-modal.component.html',
  styleUrl: './property-details-modal.component.scss'
})
export class PropertyDetailsModalComponent implements OnInit {
  @Input() propertyId: string = '';
  contact: ContactDetails = {
    mobile: '',
    email: ''
  };
  property : Property = {
    id: '',
    place: '',
    area: 0,
    info: '',
    image: '',
    isSuccess: false,
    intrestedUserIds: [],
    contact: this.contact
  };
  constructor(public activeModal: NgbActiveModal,private _sellerService: SellerService) {}
  ngOnInit(): void {
    this.fetchPropertyById(this.propertyId);
  }
  fetchPropertyById(propertyId: string): void {
    if(propertyId) {
    this._sellerService.propertiesById(propertyId).subscribe(
      (response: any) => {
        this.property = response;
      },
      (error: any) => {
        console.error('Error loading properties:', error);
      }
    );
  }
  }
}
