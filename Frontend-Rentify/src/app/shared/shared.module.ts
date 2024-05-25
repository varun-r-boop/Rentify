import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SearchComponent } from "./search/search.component";

@NgModule({
    declarations: [SidebarComponent,SearchComponent],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
    ],
    exports: [ SidebarComponent,SearchComponent]
})

export class SharedModule {}