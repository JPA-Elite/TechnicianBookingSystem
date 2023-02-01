import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-customer-nav',
  templateUrl: './customer-nav.component.html',
  styleUrls: ['./customer-nav.component.css']
})
export class CustomerNavComponent {
  technicians: any;
  filteredtechnicians: any = [];
  loggedIn = false;
  countTechnician: any;
  imageTechnicianDirectory: any = "http://localhost:8000/storage/tech_profile_images/";

  @ViewChild('modalSearch') modalSearch!: ElementRef;
  @ViewChild('search') search!: ElementRef;
  constructor(private http: HttpClient, private router: Router, private articleService: ArticleService, private fb: FormBuilder) {

  }
  ngOnInit() {
    this.loggedIn = localStorage.getItem('token') !== null;
    this.showTechnicians();

  }

  showTechnicians() {
    this.technicians = this.articleService
      .listTechnicians()
      .subscribe((technician: any) => {
        // console.log(customer[0].name);
        this.technicians = technician;

        // console.log(this.technicians + "hello");


      });
  }

  logOut() {
    localStorage.removeItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.post('http://localhost:8000/api/customer/logout', { headers: headers });
    localStorage.removeItem('token');
    localStorage.removeItem('pass');
    this.router.navigate(['/']);
  }

  filteredTechnicians() {
    this.filteredtechnicians = [];
    var data = new Array();
    console.log(this.technicians);

    for (const tech in this.technicians) {
      console.log(tech);
      if (this.technicians[tech].name.toLowerCase().indexOf(this.search.nativeElement.value) > -1) {

        data.push(this.technicians[tech]);

      } else {
        console.log(this.technicians[tech].name.toLowerCase() + " none");

      }

    }
    this.filteredtechnicians = data;
    this.countTechnician = this.filteredtechnicians.length;
    console.log(this.filteredtechnicians[0]);



  }

  showRequest(email:any){
    this.router.navigateByUrl('/request/2').then(()=>{
      localStorage.setItem('email', email);
      window.location.reload();
    });
  }
}
