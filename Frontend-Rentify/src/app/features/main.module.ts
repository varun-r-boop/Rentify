import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from "./auth/auth.module";
import { MainRoutingModule } from "./main-routing.module";
import { SellerComponent } from './seller/seller.component';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerPropertyUploadComponent } from './seller/seller-property-upload/seller-property-upload.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { SellerPropertiesComponent } from './seller/seller-properties/seller-properties.component';


@NgModule({
    declarations: [
    SellerComponent,
    BuyerComponent,
    SellerPropertyUploadComponent,
    SellerPropertiesComponent
  ],
    imports: [
        ReactiveFormsModule,
        AuthModule,
        BrowserAnimationsModule,
        MainRoutingModule,
        SharedModule,
    ]
})
export class MainModule {}