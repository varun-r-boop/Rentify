import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [SidebarComponent],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
    ],
    exports: [ SidebarComponent]
})

export class SharedModule {}