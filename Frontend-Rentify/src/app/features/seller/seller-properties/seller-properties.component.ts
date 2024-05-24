import { Component } from '@angular/core';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-seller-properties',
  templateUrl: './seller-properties.component.html',
  styleUrls: ['./seller-properties.component.scss']
})
export class SellerPropertiesComponent {
  properties: any[] = [];

  constructor(private _sellerService: SellerService) { }

  ngOnInit(): void {
    this.loadProperties();
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
