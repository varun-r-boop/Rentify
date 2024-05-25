import { Component } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { Property } from '../../model/seller.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditPropertyModalComponent } from './edit-property-modal/edit-property-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-properties',
  templateUrl: './seller-properties.component.html',
  styleUrls: ['./seller-properties.component.scss']
})
export class SellerPropertiesComponent {
  properties: Property[] = [];
  selectedProperty  : any;
  constructor(private _sellerService: SellerService,private _modalService: NgbModal, private _toastr : ToastrService) { }

  ngOnInit(): void {
    this.loadProperties();
  }

  openEditModal(propertyId: string) {
    const modalRef = this._modalService.open(EditPropertyModalComponent);
    modalRef.componentInstance.propertyId = propertyId;
    modalRef.result.then((result) => {
      this.loadProperties();
    });

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

  deleteProperty(propertyId : string){
    this._sellerService.deleteProperty(propertyId).subscribe((res)=>{
      if(res && res.isSuccess) {
        this._toastr.success('', 'Deleted Successfully', {
          timeOut: 3000,
        });
        this.loadProperties();
      }else{
        console.error("Delete failed")
      }
    });
  }
}
