import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  httpOptions = {
    headers : new HttpHeaders({ 'Content-Type': 'application/json', 'Accept' : 'application/json' ,   'Authorization': `Bearer ${localStorage.getItem('token')}`})
  };


  url:string = 'http://localhost:8000';
  constructor(private http : HttpClient) {}

  listCustomers(){
    return this.http.get<any>(this.url+ `/api/customer`, this.httpOptions);
  }
  listTechnicians(){
    return this.http.get<any>(this.url+ `/api/technician`, this.httpOptions);
  }


  addCustomers(customer:any): Observable<any>{
    return this.http.post<any>(this.url+ `/api/customer`,customer, this.httpOptions);

  }

  find(id:number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get<any>(this.url+ `/api/customer/`+id,  { headers: headers });
  }

  update(id : number, customer:any): Observable<any>{
    return this.http.put<any>(this.url+ `/api/customer/`+ id, customer, this.httpOptions);
  }

  deleteCustomer(id : any): Observable<any>{
    return this.http.delete<any>(this.url+ `/api/customer/`+ id, this.httpOptions);
  }

  login1(credentials:any): Observable<any>{
    const http = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json', 'Accept' : 'application/json' })
    };
    return this.http.post(this.url+ `/api/login/customer`,credentials,http);
  }

  login2(credentials:any): Observable<any>{
    const http = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json', 'Accept' : 'application/json' })
    };
    return this.http.post(this.url+ `/api/login/technician`,credentials,http);
  }

  showSchedules(id:number): Observable<any>{
    return this.http.get(this.url+ `/api/schedule/` + id , this.httpOptions);
  }
  showNotificationTech(id:number): Observable<any>{
    return this.http.get(this.url+ `/api/technician-notification/` + id , this.httpOptions);
  }
  addSchedules(scheds:any): Observable<any>{
    return this.http.post(this.url+ `/api/schedule` , scheds, this.httpOptions);
  }
  addFeedbacks(feed:string): Observable<any>{
    return this.http.post(this.url+ `/api/feedback` , feed, this.httpOptions);
  }
  addCertificate(cer:any): Observable<any>{
    const cerHTTP = {
      headers : new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}`})
    };

    return this.http.post(this.url+ `/api/certificate` , cer,cerHTTP);
  }
  updateTechnicianAccount( tech:any, id:any): Observable<any>{
    // const request = request.clone({
    //   headers : request.headers
    //     .set('Authorization', 'Bearer ' + token)
    //     .set('Accept', 'application/json')
    //     .set('Content-Type', 'multipart/form-data;boundary=§§§')
    // });
    const http = {
      headers : new HttpHeaders({  'Authorization': `Bearer ${localStorage.getItem('token')}` })
    };
    console.log(tech.name);
    return  this.http.put(this.url+'/api/technician/' + id, tech ,http);
  }
  updateCustomerAccount( customer:any, id:any): Observable<any>{
    // const request = request.clone({
    //   headers : request.headers
    //     .set('Authorization', 'Bearer ' + token)
    //     .set('Accept', 'application/json')
    //     .set('Content-Type', 'multipart/form-data;boundary=§§§')
    // });
    const http = {
      headers : new HttpHeaders({  'Accept' : 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` })
    };
    return  this.http.put('http://localhost:8000/api/customer/' + id, customer,http);
  }

  showCustomer(id:number): Observable<any>{
    return this.http.get(this.url+ `/api/customer/` + id , this.httpOptions);
  }
  showCustomerSchedules(id:number): Observable<any>{
    return this.http.get(this.url+ `/api/schedule/customer/` + id , this.httpOptions);
  }
  customerSchedules(scheds:any): Observable<any>{
    return this.http.post(this.url+ `/api/schedule/customer` , scheds, this.httpOptions);
  }
  customerFeedbacks(feeds:string): Observable<any>{
    return this.http.post(this.url+ `/api/feedback/customer` , feeds, this.httpOptions);
  }
}


