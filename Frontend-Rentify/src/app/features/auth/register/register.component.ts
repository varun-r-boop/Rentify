import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserEntity, UserType } from '../../model/auth.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registrationForm: FormGroup;
  userEntity: UserEntity = {
    id: '',
    firstName: '',
    lastName: '',
    userType: UserType.Buyer,
    email: '',
    mobile: '',
    password: '',
    profileLogoUrl: '',
    isEmailVerified: false
  };
  userType = UserType;
  submitted = false;
  constructor(private fb: FormBuilder,private _authService: AuthService, private _router: Router,private _toastr: ToastrService
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userType: [UserType.Buyer, Validators.required] ,
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.valid) {
      this.userEntity = this.registrationForm.value; 
      const user: UserEntity = {
        id: "",
        firstName: this.userEntity.firstName,
        lastName: this.userEntity.lastName,
        userType: this.userEntity.userType,
        email: this.userEntity.email,
        mobile: this.userEntity.mobile,
        password: this.userEntity.password,
        profileLogoUrl: "https://example.com/profile.jpg",
        isEmailVerified: false,
    };
      this.fetchRegisterUser(user);
    }
  }

  fetchRegisterUser(userEntity : UserEntity){
    this._authService.register(userEntity).subscribe((response) => {
      if (response.isSuccess) {
        this._toastr.success('Register Success', '', {
          timeOut: 3000,
          positionClass:'top-right'
        });
        this._router.navigate(['/login'])
      }else{
        this._toastr.error('Register Failed', '', {
          timeOut: 3000,
          positionClass:'top-right'
        });
      }
    });
  }
  get f() { return this.registrationForm.controls; }

  navigateToLogin(){
    this._router.navigate(['/login'])
  }
  // Custom validator to check that two fields match
  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmPassword];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
