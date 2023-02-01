import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('date') date!: ElementRef;
  @ViewChild('subject') subject!: ElementRef;
  @ViewChild('message') message!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('alert_no_email') alert_no_email!: ElementRef;
  @ViewChild('alert_all_info') alert_all_info!: ElementRef;
  @ViewChild('alert_success') alert_success!: ElementRef;





  constructor(private http: HttpClient, private router: Router, private articleService: ArticleService, private fb: FormBuilder) {

  }

  submitRequest() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token2')}`
    });

    const data = {
      'subject': this.subject.nativeElement.value,
      'message': this.message.nativeElement.value,
      'date': this.date.nativeElement.value,
      'customer_account_id': this.user.id,
      'technician_account_id': Number(localStorage.getItem('requested_id')),
      'email': this.email.nativeElement.value
    }
    // +  this.user.id + '/' + Number(localStorage.getItem('requested_id')


    this.http.post('http://localhost:8000/api/send-email-request', data, { headers: headers }).subscribe((data) => {
      console.log(data);

      if (data == "No email available in technician accounts!") {
        this.alert_no_email.nativeElement.style.display = "block";
      } else {

        const notification_data = {
          'email' :  this.email.nativeElement.value,
          'message':  this.message.nativeElement.value
        };
        this.http.post('http://localhost:8000/api/technician-notification',notification_data, { headers: headers }).subscribe(data => {
          console.log(data);
          this.alert_success.nativeElement.style.display = 'block';
        });


        localStorage.removeItem('email');
        localStorage.removeItem('requested_id');

      }

    },
      (error: any) => {
        this.alert_all_info.nativeElement.style.display = 'block';
      }
    );

  }
  removeAlerts() {
    this.alert_no_email.nativeElement.style.display = "none";
    this.alert_all_info.nativeElement.style.display = 'none';
    this.alert_success.nativeElement.style.display = 'none';
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
      'Authorization': `Bearer ${localStorage.getItem('token2')}`
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

