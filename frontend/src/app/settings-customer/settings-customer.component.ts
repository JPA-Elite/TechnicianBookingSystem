import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-settings-customer',
  templateUrl: './settings-customer.component.html',
  styleUrls: ['./settings-customer.component.css']
})
export class SettingsCustomerComponent implements OnInit {
  user: any;
  passkey!: any;
  files!: File;
  data_update: any;
  form!: FormGroup;
  submitted = false;
  @ViewChild('account') acc!: ElementRef;
  @ViewChild('password') pass!: ElementRef;
  @ViewChild('removeaccount') d_acc!: ElementRef;
  @ViewChild('cpass') cpass!: ElementRef;
  @ViewChild('npass') npass!: ElementRef;
  @ViewChild('vpass') vpass!: ElementRef;
  @ViewChild('c_alert') c_alert!: ElementRef;
  @ViewChild('v_alert') v_alert!: ElementRef;
  @ViewChild('s_alert') s_alert!: ElementRef;
  @ViewChild('no_npass_alert') no_npass_alert!: ElementRef;


  constructor(private route: ActivatedRoute, private router: Router, private articleService: ArticleService, private http: HttpClient, @Inject(DOCUMENT) document: Document, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.createForm();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token2')}`
    });

    this.http.get('http://localhost:8000/api/user', { headers: headers }).subscribe(
      result => this.user = result
    );
    this.passkey = localStorage.getItem('pass2');

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

  dismissAlert(): void {
    this.c_alert.nativeElement.style.display = 'none';
    this.v_alert.nativeElement.style.display = 'none';
    this.s_alert.nativeElement.style.display = 'none';
    this.no_npass_alert.nativeElement.style.display = "none";
  }
  changeImage(event: any) {

    this.files = <File>event.target.files[0];

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
    ,index: number): void {
    this.submitted = true;
    const formData = new FormData();

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

    //password



    //files

    if (this.files != null) {
      formData.append("image", this.files, this.files.name);
    }

    formData.append("email_verified_at", this.user.email_verified_at);
    formData.append("created_at", this.user.created_at);
    formData.append("updated_at", this.user.updated_at);

    console.log(formData.get('name'));

    const http = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token2')}` })
    };

    if (index == 1) {
      formData.append("password", this.passkey);

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
          'password': formData.get('password'),
          'type': 'customer',
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
          'password': formData.get('password'),
          'type': 'customer',
          'image': '',
          'email_verified_at': formData.get('email_verified_at'),
          "created_at": formData.get('created_at'),
          "updated_at": formData.get('update_at')
        };
      }
      this.s_alert.nativeElement.style.display = 'block';
      this.articleService.updateCustomerAccount(this.data_update, this.user.id).subscribe(((data: any) => {
        console.log(data);
      }));
    }
    if (index == 2) {

      const confirm = this.cpass.nativeElement.value;
      const new_pass = this.npass.nativeElement.value;
      const verify = this.vpass.nativeElement.value;

      if (confirm == '' && new_pass == '' && verify == '') {
        this.no_npass_alert.nativeElement.style.display = "block";
      }
      else if (new_pass == '' && verify == '') {
        this.no_npass_alert.nativeElement.style.display = "block";
      }
      else if (confirm != this.passkey && confirm != '') {
        this.c_alert.nativeElement.style.display = "block";
      } else if (new_pass != verify && new_pass != '' && verify != '') {
        this.v_alert.nativeElement.style.display = "block";
      } else if (new_pass != verify) {
        this.v_alert.nativeElement.style.display = "block";
      }
      else if (confirm != this.passkey) {
        this.c_alert.nativeElement.style.display = "block";
      }
      else {
        formData.append("password", new_pass);
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
            'password': formData.get('password'),
            'type': 'customer',
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
            'password': formData.get('password'),
            'type': 'customer',
            'image': '',
            'email_verified_at': formData.get('email_verified_at'),
            "created_at": formData.get('created_at'),
            "updated_at": formData.get('update_at')
          };
        }
        this.s_alert.nativeElement.style.display = 'block';
        localStorage.removeItem('pass2');
        localStorage.setItem('pass2', new_pass);

      }

    }


  }
  removeAccount(): void {
    const http = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token2')}` })
    };
    this.http.delete("http://localhost:8000/api/customer/" + this.user.id, http).subscribe((data)=>{
      console.log(data);
      localStorage.removeItem('token2');
      localStorage.removeItem('pass2');
      this.router.navigate(['/']);

    });

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

