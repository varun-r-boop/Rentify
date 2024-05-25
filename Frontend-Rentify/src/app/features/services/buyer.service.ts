import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { BaseResponse, PaginationData } from '../model/common.model';
import { Property, PropertyEntity } from '../model/seller.model';

@Injectable({
  providedIn: 'root',
})
export class BuyerService {
  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getProperties(pagination : PaginationData): Observable<Property[]> {
    let params = this.getPageParams(pagination.pageNumber,pagination.pageSize);
    return this.httpClient.get<Property[]>(
      `${this.baseUrl}/Buyer/properties` ,{params: params} 
    );
  }
  getSearchResults(location : string , area : number): Observable<Property[]> {
    let params = this.getParams(location,area);
    return this.httpClient.get<Property[]>(
      `${this.baseUrl}/Buyer/search`, {params: params}); 
  }

  getParams(Location:string,Area:number): HttpParams {
    let obj = {Location,Area};
    return Object.keys(obj).reduce((params, key) => 
            obj[key as keyof typeof obj] ? params.append(key, obj[key as keyof typeof obj]) : params, new HttpParams())
  }
  getPageParams(PageNumber:number,PageSize:number): HttpParams {
    let obj = {PageNumber,PageSize};
    return Object.keys(obj).reduce((params, key) => 
            obj[key as keyof typeof obj] ? params.append(key, obj[key as keyof typeof obj]) : params, new HttpParams())
  }
}
