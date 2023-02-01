import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
@Component({
  selector: 'app-notification-customer',
  templateUrl: './notification-customer.component.html',
  styleUrls: ['./notification-customer.component.css']
})
export class NotificationCustomerComponent {
  user: any;
  imageProfileDirectory: any = "http://localhost:8000/storage/cus_profile_images/";
  notifications : any;
  notificationsCount : any;

  constructor(private http: HttpClient, private router: Router, private articleService: ArticleService, private fb: FormBuilder) {

  }
  ngOnInit(): void {
  console.log( new Date());

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token2')}`
    });

    this.http.get('http://localhost:8000/api/user', { headers: headers }).subscribe(
      result => {
        this.user = result;
        this.notificationsCount = this.user.length;

        this.articleService.showNotificationCus(this.user.id).subscribe(
          result => {
            this.notifications = result;
            console.log(this.notifications);
            // this.certificates = result;

          }
        );



      }
    );
  }
}
