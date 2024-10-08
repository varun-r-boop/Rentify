import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../model/auth.model';
import { AuthService } from '../../services/auth.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated, // Ensure encapsulation is set
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  login: Login = {
    email: '',
    password: '',
  };
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _toastr: MessageService,
    private _jwtService: JwtService
  ) {
    this.loginForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.login = this.loginForm.value;
      this.fetchLoginUser(this.login);
    }
  }

  fetchLoginUser(login: Login) {
    this._authService.login(login).subscribe({
      next: (res) => {
        const token = res['headers'].get('authorization');
        if (token) {
          window.localStorage.removeItem('auth-token');
          window.localStorage.setItem('auth-token', token);
          var tokenPayload = this._jwtService.getDecodedToken(token);
          window.localStorage.setItem('user-id', tokenPayload.id);
          window.localStorage.setItem('user-details', JSON.stringify(tokenPayload));
          this._toastr.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login successful',
            life: 3000,
          });
          if (tokenPayload.role === 'Buyer') {
            this._router.navigate(['/buyer']);
          } else {
            this._router.navigate(['/seller']);
          }
        }
      },
      error: (err) => {       
           this._toastr.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Username password wrong',
        life: 3000,
      });},
    });
  }

  navigateToRegister() {
    this._router.navigate(['/register']);
  }
}
