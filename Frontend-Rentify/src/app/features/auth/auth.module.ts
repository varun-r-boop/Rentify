import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";


@NgModule({
    declarations:[
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
    ]
})
export class AuthModule {}