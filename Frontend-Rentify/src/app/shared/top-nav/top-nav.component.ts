import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { TokenPayload } from 'src/app/core/model/jwt';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(
    private jwtService: JwtService,
    private router : Router
  ) 
  {

  }
  token: TokenPayload = {
    mobile: '',
    email: '',
    role: '',
    name: '',
    id: '',
    exp: 0
  }
   loggedIn =  false;
    ngOnInit() {
          this.loggedIn = this.jwtService.checkUserLoggedIn();

    } 

    logOut(){
       this.jwtService.logout();
       this.router.navigate(['/rentify']);
      
    }


  }
