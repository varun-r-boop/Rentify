import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { BuyerComponent } from "./buyer/buyer.component";
import { SellerComponent } from "./seller/seller.component";
import { SellerPropertyUploadComponent } from "./seller/seller-property-upload/seller-property-upload.component";
import { SellerPropertiesComponent } from "./seller/seller-properties/seller-properties.component";
import { SellerGuard } from "../core/guard/seller.guard";
import { BuyerGuard } from "../core/guard/buyer.guard";

const routes: Routes = [
    {
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'buyer',
        canActivate: [BuyerGuard],
        component: BuyerComponent,
    },
    { path: 'seller',    canActivate: [SellerGuard],
    component: SellerComponent, children: [
        { path: 'add-property', component: SellerPropertyUploadComponent },
        { path: 'your-properties', component: SellerPropertiesComponent },
        { path: '', redirectTo: 'add-property', pathMatch: 'full' } // Default to Add Property
      ]
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {}