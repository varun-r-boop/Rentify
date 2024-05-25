import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ContactDetails, Property } from 'src/app/features/model/seller.model';
import { SellerService } from 'src/app/features/services/seller.service';

@Component({
  selector: 'app-edit-property-modal',
  templateUrl: './edit-property-modal.component.html',
  styleUrls: ['./edit-property-modal.component.scss']
})
export class EditPropertyModalComponent implements OnInit {
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
    exception: '',
    stackTrace: '',
    intrestedUserIds: [],
    contact: this.contact
  }
  constructor(public activeModal: NgbActiveModal,private _sellerService: SellerService,private _toastr : ToastrService) {}
  ngOnInit(): void {
    this.fetchPropertyById(this.propertyId);
  }

  saveChanges() {
    this.fetchUpdateProperty(this.property);
  }
  
  fetchUpdateProperty(property : Property){
    if(property) {
      this._sellerService.updateProperty(property).subscribe(
        (response) => {
          if(response.isSuccess){
            this._toastr.success('', 'Updated Successfully', {
              timeOut: 3000,
            });
            this.activeModal.close();
          }else{
            console.error('Error loading properties:');
          }
        },
        (error: any) => {
          console.error('Error loading properties:', error);
        }
      );
    }
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
