import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  user: any;
  loggedIn = false;
  scheds: any;

  @ViewChild('errconcern') errconcern!: ElementRef;
  @ViewChild('succconcern') succconcern!: ElementRef;
  @ViewChild('concern_message') concern_message!: ElementRef;
  constructor(private http: HttpClient, private router: Router, private articleService: ArticleService, private fb: FormBuilder) {

  }
  ngOnInit() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get('http://localhost:8000/api/user', { headers: headers }).subscribe(
      result => {
        this.user = result;
        this.articleService.showSchedules(Number(this.user.id)).subscribe(
          res => {
            this.scheds = res;
          });
      }
    );






    this.loggedIn = localStorage.getItem('token') !== null;




  }
  scheds_data: any;
  error_feedbacks: any = [];
  add(desc: string, startD: string, endD: string, startT: string, endT: string) {

    this.scheds_data = {
      'technician_account_id': Number(this.user.id),
      'description': desc,
      'date_started': startD,
      'date_ended': endD,
      'time_started': startT,
      'time_ended': endT
    };
    this.articleService.addSchedules(this.scheds_data as any).subscribe(sched => {
      this.scheds_data = sched;
      console.log(this.scheds_data);
      console.log("successfully added!");
       window.location.reload();
    }


    );


  }
  concerns_data: any;
  addConcern(message: string) {
    this.concerns_data = {
      'technician_account_id': Number(this.user.id),
      'message': message
    };

    this.articleService.addFeedbacks(this.concerns_data as any).subscribe(feed => {
      this.concerns_data = feed;
      console.log(this.concerns_data);
      console.log("successfully added!");
      this.succconcern.nativeElement.style.display = 'block';
      this.concern_message.nativeElement.value = '';
    },
      (errorResponse: HttpErrorResponse) => {
        console.log('Cannot register!');
        // this.error_data = errorResponse.error.errors;
        // const propertyErrors: Array<string> = errorResponse.error.errors[0];
        if (errorResponse.error.errors) {

          // 5 - For each error property (which is a form field)
          for (const property in errorResponse.error.errors) {

            if (errorResponse.error.errors.hasOwnProperty(property)) {

              // 6 - Extract it's array of errors
              const propertyErrors: Array<string> = errorResponse.error.errors[property];

              // 7 - Push all errors in the array to the errors array
              propertyErrors.forEach(error => this.error_feedbacks.push(error));

            }

          }


        }
        console.log(this.error_feedbacks);

        if (this.error_feedbacks.indexOf('The message field is required.') > -1) {
          this.errconcern.nativeElement.style.display = 'block';



        }
      });
  }

  errRemove(){
    this.errconcern.nativeElement.style.display = 'none';
    this.succconcern.nativeElement.style.display = 'none';
  }

  logOut() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.post('http://localhost:8000/api/technician/logout', { headers: headers });
    localStorage.removeItem('token');
    localStorage.removeItem('pass');
    this.router.navigate(['/']);


  }
}
