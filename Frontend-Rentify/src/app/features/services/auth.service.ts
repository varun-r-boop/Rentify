import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Login, UserEntity } from '../model/auth.model';
import { BaseResponse } from '../model/common.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  register(user: UserEntity): Observable<BaseResponse>{
    return this.httpClient.post<BaseResponse>(`${this.baseUrl}/Auth/register`, user)
}

  login(login: Login): Observable<HttpResponse<BaseResponse>> {
  return this.httpClient.post<BaseResponse>(`${this.baseUrl}/Auth/login`, login , {
    observe: "response"
  });
}
}
