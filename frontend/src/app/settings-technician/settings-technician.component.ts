import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  form!: FormGroup;
  submitted = false;
  @ViewChild('account') acc!: ElementRef;
  @ViewChild('password') pass!: ElementRef;
  @ViewChild('removeaccount') d_acc!: ElementRef;
  constructor(private route: ActivatedRoute, private router: Router, private articleService: ArticleService, private http: HttpClient, @Inject(DOCUMENT) document: Document, private fb: FormBuilder) { }
  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get('http://localhost:8000/api/user', { headers: headers }).subscribe(
      result => this.user = result
    );
    this.passkey = localStorage.getItem('pass');


  }

  changeImage(event: any) {
    // this.files = (event.target as HTMLInputElement)?.files?.[0];
    this.files = <File>event.target.files[0];
    // this.form.patchValue({
    //   image:this.files
    // });
    console.log(this.files);
  }

  onSubmit(na: any, email: any, address: any, gender: any, age: any,
    birthdate: any, phone: any
    , validID: any, category: any) {
    this.submitted = true;

    const formData = new FormData();

    formData.append("name", na);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("birthdate", birthdate);
    formData.append("phone", phone);
    formData.append("valid_id", validID);
    formData.append("category", category);
    if (this.files != null) {
      formData.append("image", this.files, this.files.name);
    }





    // this.cers_data = {
    //   'technician_account_id': formData.get('technician_account_id'),
    //   'image': formData.get('image')
    // };
    console.log('ff');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    this.articleService.updateTechnicianAccount(this.user.id, formData).subscribe(
      next => {
        console.log('updated!');
      }
    );
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
