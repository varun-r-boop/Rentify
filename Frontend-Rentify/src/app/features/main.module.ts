import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from "./auth/auth.module";
import { MainRoutingModule } from "./main-routing.module";
import { SellerComponent } from './seller/seller.component';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerPropertyUploadComponent } from './seller/seller-property-upload/seller-property-upload.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { SellerPropertiesComponent } from './seller/seller-properties/seller-properties.component';
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EditPropertyModalComponent } from "./seller/seller-properties/edit-property-modal/edit-property-modal.component";


@NgModule({
    declarations: [
    SellerComponent,
    BuyerComponent,
    SellerPropertyUploadComponent,
    SellerPropertiesComponent,
    EditPropertyModalComponent
  ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        AuthModule,
        BrowserAnimationsModule,
        MainRoutingModule,
        SharedModule,
        CommonModule ,
        NgbModule     ]
})
export class MainModule {}