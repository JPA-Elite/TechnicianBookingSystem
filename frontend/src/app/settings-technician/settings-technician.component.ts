import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-settings-technician',
  templateUrl: './settings-technician.component.html',
  styleUrls: ['./settings-technician.component.css']
})
export class SettingsTechnicianComponent implements OnInit {
  user: any;
  passkey!: any;
  files!: File;
  data_update: any;
  form!: FormGroup;
  submitted = false;
  @ViewChild('account') acc!: ElementRef;
  @ViewChild('password') pass!: ElementRef;
  @ViewChild('removeaccount') d_acc!: ElementRef;
  constructor(private route: ActivatedRoute, private router: Router, private articleService: ArticleService, private http: HttpClient, @Inject(DOCUMENT) document: Document, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.createForm();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get('http://localhost:8000/api/user', { headers: headers }).subscribe(
      result => this.user = result
    );
    this.passkey = localStorage.getItem('pass');


  }

  // onCreateService(form: FormGroup) {
  //   const formData = {
  //     image: this.selectedImage,
  //     name: this.servicesForm.get('name').value,
  //     amount: this.servicesForm.get('price').value,
  //     description: this.servicesForm.get('content').value
  //   };
  //   console.log(formData);
  // }

  changeImage(event: any) {
    // this.files = (event.target as HTMLInputElement)?.files?.[0];
    this.files = <File>event.target.files[0];
    // this.form.patchValue({
    //   image:this.files
    // });
    console.log(this.files);
  }

  createForm() {
    this.form = this.fb.group({
      image: [null, Validators.required]
    });
  }
  get f() {
    return this.form.controls;
  }
  onSubmit(name: string, email: string, address: string, gender: string, age: string,
    birthdate: string, phone: string
    , validID: string, category: string) {
    this.submitted = true;
    const formData = new FormData();
    // if (this.form.invalid) {
    //   console.log("not send");
    // }




    console.log(name);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    if (gender != "") {
      formData.append("gender", gender);
    } else {
      formData.append("gender", this.user.gender);

    }

    formData.append("age", age);
    formData.append("birthdate", birthdate);
    formData.append("phone", phone);
    if (validID != "") {
      formData.append("valid_id", validID);
    } else {
      formData.append("valid_id", this.user.valid_id);
    }

    if (category != "") {
      formData.append("category", category);
    } else {
      formData.append("category", this.user.category);
    }

    formData.append("password", this.passkey);
    if (this.files != null) {
      formData.append("image", this.files, this.files.name);
    }

    formData.append("email_verified_at", this.user.email_verified_at);
    formData.append("created_at", this.user.created_at);
    formData.append("updated_at", this.user.updated_at);
    // "email_verified_at": "2023-01-30T08:46:12.000000Z",
    // "created_at": "2023-01-30T08:46:20.000000Z",
    // "updated_at": "2023-01-30T08:46:20.000000Z"





    // this.cers_data = {
    //   'technician_account_id': formData.get('technician_account_id'),
    //   'image': formData.get('image')
    // };
    console.log(formData.get('name'));
    // const headers = new HttpHeaders({
    //   'Accept': 'application/json',
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });
    // console.log(this.formData);

    if (this.files != null) {
      console.log('have file');

      this.data_update = {
        'name': formData.get('name'),
        'gender': formData.get('gender'),
        'birthdate': formData.get('birthdate'),
        'age': formData.get('age'),
        'address': formData.get('address'),
        'phone': formData.get('phone'),
        'email': formData.get('email'),
        'valid_id': formData.get('valid_id'),
        'category': formData.get('category'),
        'password': formData.get('password'),
        'type': 'technician',
        'image': formData.get('image'),
        'email_verified_at': formData.get('email_verified_at'),
        "created_at": formData.get('created_at'),
        "updated_at": formData.get('update_at')
      };
    } else {
      this.data_update = {
        'name': formData.get('name'),
        'gender': formData.get('gender'),
        'birthdate': formData.get('birthdate'),
        'age': formData.get('age'),
        'address': formData.get('address'),
        'phone': formData.get('phone'),
        'email': formData.get('email'),
        'valid_id': formData.get('valid_id'),
        'category': formData.get('category'),
        'password': formData.get('password'),
        'type': 'technician',
        'image': '',
        'email_verified_at': formData.get('email_verified_at'),
        "created_at": formData.get('created_at'),
        "updated_at": formData.get('update_at')
      };
    }


    const http = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` })
    };
    // return this.http.put('http://localhost:8000/api/technician/1',formData, http).subscribe(((data :any) => {
    //   console.log(data);
    // }));
    return this.articleService.updateTechnicianAccount(formData, this.user.id).subscribe(((data: any) => {
      console.log(data);
    }));
  }
  changePage(index: number) {
    if (index == 1) {
      this.acc.nativeElement.style.display = 'block';
      this.pass.nativeElement.style.display = 'none';
      this.d_acc.nativeElement.style.display = 'none';



    }
    else if (index == 2) {
      this.acc.nativeElement.style.display = 'none';
      this.pass.nativeElement.style.display = 'block';
      this.d_acc.nativeElement.style.display = 'none';

    }
    else if (index == 3) {
      this.acc.nativeElement.style.display = 'none';
      this.pass.nativeElement.style.display = 'none';
      this.d_acc.nativeElement.style.display = 'block';

    }
  }

}
