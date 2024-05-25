import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyerService } from 'src/app/features/services/buyer.service';
import { Property } from 'src/app/features/model/seller.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query: string = '';
  location:string= "";
  area: number = 0;
  pageNumber: number=1;
  properties: Property[] = [];
  @Output() searchCallback: EventEmitter<Property[]> = new EventEmitter();
  constructor(
    public _buyerService: BuyerService,
  ) { }

  ngOnInit(): void {
  }
  onSearch(event?: any): void {
      if (!isNaN(Number(event))) {
        this.area = Number(event);
      } else {
        this.area = 0; // or area = 0; or any other default value
      }
      this.location = event;
      this._buyerService.getSearchResults(this.location,this.area).subscribe(res =>{
        if(res){
          this.properties = res;
          this.searchCallback.emit(this.properties);
        }
      });
  }
}
