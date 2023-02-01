import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from '../services/article.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  pass!: string;
  @ViewChild('email') em!: ElementRef;
  @ViewChild('password') pa!: ElementRef;
  @ViewChild('error') er!: ElementRef;



  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private articleService: ArticleService, @Inject(DOCUMENT) document: Document) {
  }
  ngOnInit() {
    this.form = this.fb.group({
      email: '',
      password: ''
    });
  }
  credentials: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*'
    })
  };

  submit(email: string, password: string) {


    this.credentials = {
      'email': email,
      'password': password
    };
    this.pass = password;


    this.articleService.login1(this.credentials as any).subscribe(
      (result: any) => {
        if (result.token != null) {
          localStorage.setItem('token2', result.token);
          localStorage.setItem('pass2', this.pass);
          console.log(localStorage.getItem('token2'));
          this.router.navigate(['/home/2']);
        } else {
          this.articleService.login2(this.credentials as any).subscribe(
            (result: any) => {
              if (result.token != null) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('pass', this.pass);
                console.log(localStorage.getItem('token'));
                this.router.navigate(['/home/1']);

              } else {
                console.log('no account');
                this.em.nativeElement.value = "";
                this.pa.nativeElement.value = '';
                this.er.nativeElement.style.display = 'block';
                // window.location.reload();
              }


            },
            // error => {
            //   this.em.nativeElement.value = "";
            //   this.pa.nativeElement.value = '';
            // }
            (errorResponse: HttpErrorResponse) => {
              // Extract form error messages from API  <------ HERE!!!
              // const messages = extractErrorMessagesFromErrorResponse(errorResponse);
              console.log(errorResponse);
            }
          );


        }

      },
      (errorResponse: HttpErrorResponse) => {
        // Extract form error messages from API  <------ HERE!!!
        // const messages = extractErrorMessagesFromErrorResponse(errorResponse);
        console.log('Invalid Credentials');
        this.er.nativeElement.style.display = 'block';
        this.em.nativeElement.value = "";
        this.pa.nativeElement.value = '';
      }
    );

  }
  removeError(){
    this.er.nativeElement.style.display = 'none';
  }
}


function extractErrorMessagesFromErrorResponse(errorResponse: HttpErrorResponse) {
  throw new Error('Function not implemented.');
}

