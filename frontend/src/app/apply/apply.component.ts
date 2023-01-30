import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private articleService: ArticleService, private fb: FormBuilder) { }
  customers: any;
  user: any;
  form!: FormGroup;
  submitted = false;
  certificates: any = [];
  imageCertificateDirectory: any = "http://localhost:8000/cer_images/";
  imageCustomerDirectory: any = "http://localhost:8000/tech_profile_images/";
  files!: File;

  showCustomers() {
    this.customers = this.articleService
      .listCustomers()
      .subscribe((customer: any) => {
        this.customers = customer;
        console.log(this.customers);
      });
  }

  deleteCustomer(id: any) {
    this.articleService.deleteCustomer(id).subscribe(
      (res: any) => {
        this.customers = this.customers.filter((a: any) => a.id != id);
      });

    this.router.navigateByUrl('/transactions');

  }
  cers_data: any;

  // addCertificate() {
  //   this.cers_data = {
  //     'technician_account_id': Number(this.user.id),
  //     'image' : cer
  //   };
  //   this.articleService.add Certificate(this.cers_data as any).subscribe(
  //     (      res: any) => {
  //      console.log('succesfull');
  //     });

  //   this.router.navigateByUrl('/transactions');

  // }
  createForm() {
    this.form = this.fb.group({
      image: [null, Validators.required]
    });
  }
  get f() {
    return this.form.controls;
  }
  changeImage(event: any) {
    // this.files = (event.target as HTMLInputElement)?.files?.[0];
    this.files = <File>event.target.files[0];
    // this.form.patchValue({
    //   image:this.files
    // });
    console.log(this.files);
  }

  onSubmit(type: any) {
    this.submitted = true;
    if (this.form.invalid) {
      console.log("not send");
    }
    const formData = new FormData();

    formData.append("image", this.files, this.files.name);
    formData.append("category", type);
    formData.append("technician_account_id", this.user.id);


    // this.cers_data = {
    //   'technician_account_id': formData.get('technician_account_id'),
    //   'image': formData.get('image')
    // };
    console.log(formData);
    this.articleService.addCertificate(formData).subscribe(
      (res: any) => {
        console.log(res);
        window.location.reload();
      });
  }


  ngOnInit(): void {
    this.showCustomers();
    this.createForm()

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get('http://localhost:8000/api/user', { headers: headers }).subscribe(
      result => {
        this.user = result;
        this.articleService.showSchedules(Number(this.user.id)).subscribe(
          res => {

          });

        this.http.get('http://localhost:8000/api/certificate/' + this.user.id, { headers: headers }).subscribe(
          result => {
            this.certificates = result;
            // this.certificates = result;
            console.log(this.certificates);
          }
        );
      }
    );


  }
}
