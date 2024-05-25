import { CanActivate, Router } from "@angular/router";
import { JwtService } from "../services/jwt.service";
import { TokenPayload } from "../model/jwt";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class BuyerGuard implements CanActivate {
  
  tokenPayload: TokenPayload = {
    mobile: "",
    email: "",
    role: "",
    name: "",
    id: "",
    exp: 0
  };
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private _toastr: ToastrService
  )
  {

  }
  
  canActivate(): boolean {
    const token = window.localStorage.getItem('auth-token');
    if(token) { 
         this.tokenPayload = this.jwtService.getDecodedToken(token);
    }
    if(this.tokenPayload.role == 'Buyer')
    {
      return true;
    }
    else{
      this.router.navigate(['/login']).then(() => {
        this._toastr.error('', 'Unauthorised', {
          timeOut: 3000,
        });      })
      return false;
    }
  }
  
}
