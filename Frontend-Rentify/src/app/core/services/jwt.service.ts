import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../model/jwt';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  tokenPayload: TokenPayload = {} as TokenPayload;
  isLoggedIn: Boolean = false;
  constructor() {}

  tokenExpired(expiry: number) {
    // const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  logout() {
    window.localStorage.removeItem('auth-token');
  }

  getDecodedToken(token: string): TokenPayload {
    return jwtDecode(token);
  }

  checkUserLoggedIn(): boolean {
    if (window.localStorage.getItem('auth-token')) {
      this.tokenPayload = this.getDecodedToken(window.localStorage.getItem('auth-token') ?? '');
      if (this.tokenExpired(this.tokenPayload.exp)) {
        return (this.isLoggedIn = false);
      }
      return (this.isLoggedIn = true);
    }
    return (this.isLoggedIn = false);
  }
}
