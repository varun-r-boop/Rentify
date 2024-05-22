import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from "./auth/auth.module";
import { MainRoutingModule } from "./main-routing.module";


@NgModule({
    declarations: [],
    imports: [
        AuthModule,
        BrowserAnimationsModule,
        MainRoutingModule
    ]
})
export class MainModule {}