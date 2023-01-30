import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from '../services/article.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,private articleService:ArticleService) {

  }
  pass: any;
  cpass: any;

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required, Validators.min(18)],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      phone: ['', Validators.required, Validators.minLength(11), Validators.maxLength(11)],
      address: ['', Validators.required],
      category: ['', Validators.required],
      valid_id: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    },
      // {
      //   validators :this.passwordMatch('password', 'password_confirmation')
      // }

    );
    this.pass = this.form.controls['password'].value;
    this.cpass = this.form.controls['password_confirmation'].value;

  }

  passwordMatch(password: any, compassword: any) {

    return (formGroup: FormGroup) => {
      const password_c = formGroup.controls[password].value;
      const compassword_c = formGroup.controls[compassword].value;
      if (password_c !== compassword_c) {

      }
    };

  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
  };
  error_data: any = [];
  @ViewChild('err_name') err_name!: ElementRef;
  @ViewChild('err_age') err_age!: ElementRef;
  @ViewChild('err_birth') err_birth!: ElementRef;
  @ViewChild('err_gender') err_gender!: ElementRef;
  @ViewChild('err_email') err_email!: ElementRef;
  @ViewChild('err_phone') err_phone!: ElementRef;
  @ViewChild('err_address') err_address!: ElementRef;
  @ViewChild('err_category') err_category!: ElementRef;
  @ViewChild('err_valid_id') err_valid_id!: ElementRef;
  @ViewChild('err_password') err_password!: ElementRef;
  @ViewChild('err_cpassword') err_cpassword!: ElementRef;
  @ViewChild('err_check') err_check!: ElementRef;
  @ViewChild('error_p_confirm') error_p_confirm!: ElementRef;
  @ViewChild('error_p_least') error_p_least!: ElementRef;
  @ViewChild('error_check_mess') error_check_mess!: ElementRef;
  @ViewChild('err_valid_email') err_valid_email!: ElementRef;
  @ViewChild('gender') gender!: ElementRef;
  @ViewChild('birthdate') birthdate!: ElementRef;

  submit(): void {
    const formData = this.form.controls;

    const data = {
      name:  this.err_name.nativeElement.value,
      age: this.err_age.nativeElement.value,
      birthdate: this.birthdate.nativeElement.value,
      gender: this.gender.nativeElement.value,
      email: this.err_email.nativeElement.value,
      phone: this.err_phone.nativeElement.value,
      address:  this.err_address.nativeElement.value,
      category: formData['category'].value,
      valid_id: formData['valid_id'].value,
      password:  this.err_password.nativeElement.value,
      password_confirmation:  this.err_cpassword.nativeElement.value,


    }
    // console.log(data);

    if (!this.err_check.nativeElement.checked) {
      this.error_check_mess.nativeElement.style.display = 'block';
    } else {
      this.http.post('http://localhost:8000/api/register/technician', data, this.httpOptions)
        .subscribe(
          () => {
            this.router.navigate(['/login'])
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
                  propertyErrors.forEach(error => this.error_data.push(error));

                }

              }


            }
            console.log(this.error_data);

            if (this.error_data.indexOf('The name field is required.') > -1) {
              this.err_name.nativeElement.placeholder = 'Input field is required!';
            }
            if (this.error_data.indexOf('The age field is required.') > -1) {
              this.err_age.nativeElement.placeholder = 'Input field is required!';
            }
            if (this.error_data.indexOf('The birthdate field is required.') > -1) {
              this.err_birth.nativeElement.style.display = 'block';
            }
            // if (this.error_data.indexOf('The gender field is required.') > -1) {
            //   this.err_gender.nativeElement.placeholder = 'Input field is required!';
            // }
            if (this.error_data.indexOf('The email field is required.') > -1) {
              this.err_email.nativeElement.placeholder = 'Input field is required!';
            }
            if (this.error_data.indexOf('The gender field is required.') > -1) {
              this.err_gender.nativeElement.style.display = 'block';
            }
            if (this.error_data.indexOf('The phone field is required.') > -1) {
              this.err_phone.nativeElement.placeholder = 'Input field is required!';
            }
            if (this.error_data.indexOf('The address field is required.') > -1) {
              this.err_address.nativeElement.placeholder = 'Input field is required!';
            }

            if (this.error_data.indexOf('The valid id field is required.') > -1) {
              this.err_valid_id.nativeElement.style.display = 'block';
            }
            if (this.error_data.indexOf('The category field is required.') > -1) {
              this.err_category.nativeElement.style.display = 'block';
            }
            if (this.error_data.indexOf('The password confirmation does not match.') > -1) {
              this.error_p_confirm.nativeElement.style.display = 'block';
            }
            if (this.error_data.indexOf('The password must be at least 6 characters.') > -1) {
              this.error_p_least.nativeElement.style.display = 'block';
            }
            if (this.error_data.indexOf('The email must be a valid email address.') > -1) {
              this.err_valid_email.nativeElement.style.display = 'block';
            }



          }
        );
    }



  }

  removeError() {
    this.error_data = [];
    this.err_birth.nativeElement.style.display = 'none';
    this.err_gender.nativeElement.style.display = 'none';
    this.err_category.nativeElement.style.display = 'none';
    this.err_valid_id.nativeElement.style.display = 'none';
    this.error_p_confirm.nativeElement.style.display = 'none';
    this.error_p_least.nativeElement.style.display = 'none';
    this.error_p_confirm.nativeElement.style.display = 'none';
    this.error_check_mess.nativeElement.style.display = 'none';
    this.err_valid_email.nativeElement.style.display = 'none';
  }

}
