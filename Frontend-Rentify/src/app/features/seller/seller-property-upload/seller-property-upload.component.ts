import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyEntity } from '../../model/seller.model';
import { SellerService } from '../../services/seller.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-property-upload',
  templateUrl: './seller-property-upload.component.html',
  styleUrls: ['./seller-property-upload.component.scss']
})
export class SellerPropertyUploadComponent implements OnInit {
  propertyForm: FormGroup;
  propertyEntity : PropertyEntity = {
    id: '',
    userId: '',
    place: '',
    area: 0,
    info: '',
    image: ''
  };
  constructor(private fb: FormBuilder, private _sellerService : SellerService,     private _toastr: ToastrService,
  ) {
    this.propertyForm = this.fb.group({
      place: ['', Validators.required],
      area: ['', Validators.required],
      bedrooms: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      nearby: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  ngOnInit(): void { }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.propertyForm.patchValue({
        image: file
      }); 
    }
  }

  onSubmit(): void {
    if (this.propertyForm.valid) {
      this.propertyEntity = this.propertyForm.value;
      const tokenPayload = window.localStorage.getItem('user-details');
      if(tokenPayload){
        const userDetails = JSON.parse(tokenPayload);
        this.propertyEntity.id = '';
        this.propertyEntity.userId = userDetails?.id;
        this.propertyEntity.image = '';
        this.propertyEntity.info = '';
      }
      this.fetchUploadProperty(this.propertyEntity)
    }
  }

  fetchUploadProperty(property: PropertyEntity) {
    this._sellerService.uploadProperty(property).subscribe({
      next: (res) => {
        this._toastr.success('Success', '', {
          timeOut: 3000,
          positionClass:'top-right'
        });
      },
      error: (err) => {},
    });
  }
}
