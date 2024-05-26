import { Component, OnInit } from '@angular/core';
import { BuyerService } from '../services/buyer.service';
import { Property } from '../model/seller.model';
import { PropertyDetailsModalComponent } from './property-details-modal/property-details-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../services/seller.service';
import { PaginationData } from '../model/common.model';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit {
  constructor(private _buyerService: BuyerService,
    private _sellerService : SellerService,
    private _modalService: NgbModal, 
    private _jwtService:JwtService,
    private messageService: MessageService,
  private _router: Router){
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
    if(!this._jwtService.checkUserLoggedIn()){
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'UnAuthorised',
        life: 3000,
      });
      this._router.navigate(['/login']);
      return;
    }
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
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load property',
          life: 3000,
        });
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
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Notified property owner',
              life: 3000,
            });
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Check your mail for details',
              life: 3000,
            });
          }else{
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error ocurred',
              life: 3000,
            });
          }
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error ocurred',
            life: 3000,
          });     }
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
