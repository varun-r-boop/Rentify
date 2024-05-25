import { Component, OnInit } from '@angular/core';
import { BuyerService } from '../services/buyer.service';
import { Property } from '../model/seller.model';
import { PropertyDetailsModalComponent } from './property-details-modal/property-details-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../services/seller.service';
import { ToastrService } from 'ngx-toastr';
import { PaginationData } from '../model/common.model';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit {
  constructor(private _buyerService: BuyerService,private _sellerService : SellerService,private _modalService: NgbModal, private _toastr : ToastrService){
  }
  properties : Property[] = [];
  pagination : PaginationData = {
    pageNumber: 1,
    pageSize: 6
  };
  ngOnInit(): void {
    this.fetchProperties();
  }

  openDetailsModal(propertyId: string) {
    const modalRef = this._modalService.open(PropertyDetailsModalComponent);
    modalRef.componentInstance.propertyId = propertyId;
    modalRef.result.then(() => {
      this.fetchProperties();
    });

  }
  fetchProperties(){
    this._buyerService.getProperties(this.pagination).subscribe((res)=>{
      if(res) {
        res.forEach(property => {          
          this.properties.push(property);
        });
      }else{
        console.error("Failed to load  property")
      }
    });
  }

  fetchUpdateInterest(property : Property){
    if(property) {
      const userId = window.localStorage.getItem("user-id");
      if(userId) {
        property.intrestedUserIds.push(userId);
      }
      this._sellerService.updateProperty(property).subscribe(
        (response) => {
          if(response.isSuccess){
            this._toastr.success('', 'Notified Owner', {
              timeOut: 3000,
            });
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
  searchCallback(event:any){
    this.properties = event;
  }
  loadPadinationData(){
    this.pagination.pageNumber = this.pagination.pageNumber + 1; 
    this.fetchProperties();
  }
}
