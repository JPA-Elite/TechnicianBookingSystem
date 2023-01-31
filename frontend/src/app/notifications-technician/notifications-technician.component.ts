import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-notifications-technician',
  templateUrl: './notifications-technician.component.html',
  styleUrls: ['./notifications-technician.component.css']
})
export class NotificationsTechnicianComponent implements OnInit {
  user: any;
  imageProfileDirectory: any = "http://localhost:8000/storage/tech_profile_images/";
  notifications : any;
  notificationsCount : any;

  constructor(private http: HttpClient, private router: Router, private articleService: ArticleService, private fb: FormBuilder) {

  }
  ngOnInit(): void {
  console.log( new Date());

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get('http://localhost:8000/api/user', { headers: headers }).subscribe(
      result => {
        this.user = result;
        this.notificationsCount = this.user.length;

        this.articleService.showNotificationTech(this.user.id).subscribe(
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
