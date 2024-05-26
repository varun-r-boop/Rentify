import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyEntity,ContactDetails } from '../../model/seller.model';
import { SellerService } from '../../services/seller.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-seller-property-upload',
  templateUrl: './seller-property-upload.component.html',
  styleUrls: ['./seller-property-upload.component.scss']
})
export class SellerPropertyUploadComponent implements OnInit {
  propertyForm: FormGroup;
  contact: ContactDetails = {
    mobile: '',
    email: ''
  };
  propertyEntity : PropertyEntity = {
    id: '',
    userId: '',
    place: '',
    area: 0,
    info: '',
    image: '',
    intrestedUserIds: [],
    contact: this.contact 
  };
  constructor(private fb: FormBuilder, private _sellerService : SellerService,     private _toastr: MessageService,
  ) {
    this.propertyForm = this.fb.group({
      place: ['', Validators.required],
      area: ['', Validators.required],
      bedrooms: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      nearby: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        this.propertyForm.patchValue({
          image: base64String
        }); 
      };
    }
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      this.propertyEntity = this.propertyForm.value;
      const tokenPayload = window.localStorage.getItem('user-details');
      if(tokenPayload){
        const userDetails = JSON.parse(tokenPayload);
        this.propertyEntity.id = '';
        this.propertyEntity.userId = userDetails?.id;
        this.propertyEntity.image = this.propertyForm.controls['image'].value;;
        this.propertyEntity.info = this.propertyForm.controls['nearby'].value;
        const contact : ContactDetails = {
          mobile: userDetails.mobile,
          email: userDetails.email
        };
        this.propertyEntity.contact = contact;
        this.propertyEntity.intrestedUserIds = [];
      }
      this.fetchUploadProperty(this.propertyEntity)
    }
  }

  fetchUploadProperty(property: PropertyEntity) {
    this._sellerService.uploadProperty(property).subscribe({
      next: (res) => {
        this._toastr.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Upload successful',
          life: 3000,
        });
        this.propertyForm.reset();
      },
      error: (err) => {},
    });
  }
}
