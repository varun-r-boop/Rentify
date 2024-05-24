import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { BaseResponse } from '../model/common.model';
import { Property, PropertyEntity } from '../model/seller.model';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  uploadProperty(property: PropertyEntity): Observable<BaseResponse>{
    return this.httpClient.post<BaseResponse>(`${this.baseUrl}/Seller/upload`, property);
}
  propertiesByUserId(userId : string):Observable<Property>{
  return this.httpClient.get<Property>(`${this.baseUrl}/Seller/properties?userId=`+userId );
}
}
