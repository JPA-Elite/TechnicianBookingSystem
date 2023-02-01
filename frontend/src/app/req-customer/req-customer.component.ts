import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-req-customer',
  templateUrl: './req-customer.component.html',
  styleUrls: ['./req-customer.component.css']
})
export class ReqCustomerComponent implements OnInit {
  user: any;
  customers: any;
  req_email: any;

  constructor(private http: HttpClient, private router: Router, private articleService: ArticleService, private fb: FormBuilder) {

  }
  // showCustomers() {
  //   this.customers = this.articleService
  //     .showCustomer()
  //     .subscribe((customer: any) => {
  //       this.customers= customer;
  //       console.log(this.customers);
  //       // this.countCustomer = technician.length;
  //     });
  // }
  ngOnInit() {
    // this.showCustomers();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    this.http.get('http://localhost:8000/api/user', { headers: headers }).subscribe(
      result => {
        this.user = result;
        this.articleService.showCustomer(Number(this.user.id)).subscribe(
          res => {
            this.user = res;
          });
      }
    );
   
    this.req_email = localStorage.getItem('email');



  }
}

