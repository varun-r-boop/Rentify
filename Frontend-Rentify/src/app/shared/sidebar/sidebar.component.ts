import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent { 
  @Output() tabChangeEvent = new EventEmitter<boolean>();
  tabClickEvent(showUploadProperty: boolean): void{
    this.tabChangeEvent.emit(showUploadProperty);
  }
}
