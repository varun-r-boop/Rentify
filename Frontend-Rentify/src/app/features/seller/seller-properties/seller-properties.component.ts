import { Component } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { Property } from '../../model/seller.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-seller-properties',
  templateUrl: './seller-properties.component.html',
  styleUrls: ['./seller-properties.component.scss']
})
export class SellerPropertiesComponent {
  properties: any;
  selectedProperty  : any;
  constructor(private _sellerService: SellerService,private _modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadProperties();
  }

  openEditModal(property: any) {
    this.selectedProperty = { ...property };
    const modalRef = this._modalService.open('#editModal');
  }

  saveChanges() {
    this._modalService.dismissAll();
  }

  loadProperties(): void {
    const userId = window.localStorage.getItem('user-id');
    if(userId) {
    this._sellerService.propertiesByUserId(userId).subscribe(
      (response: any) => {
        this.properties = response;
      },
      (error: any) => {
        console.error('Error loading properties:', error);
      }
    );
  }
  }
}
