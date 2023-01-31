import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-nav',
  templateUrl: './customer-nav.component.html',
  styleUrls: ['./customer-nav.component.css']
})
export class CustomerNavComponent {
  loggedIn = false;
  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit(){
    this.loggedIn = localStorage.getItem('token')!== null;
  }

  logOut(){
    localStorage.removeItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.post('http://localhost:8000/api/customer/logout', { headers: headers });
    localStorage.removeItem('token');
    localStorage.removeItem('pass');
    this.router.navigate(['/']);
  }

}
