import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  url:string = 'http://localhost:8000';
  constructor(private http : HttpClient) {}

  listCustomers(){
    return this.http.get<any>(this.url+ `/api/customer`);
  }

  httpOptions = {
    headers : new HttpHeaders({ 'Content-Type': 'application/json', 'Accept' : 'application/json' })
  };

  addCustomers(customer:any): Observable<any>{
    return this.http.post<any>(this.url+ `/api/customer`,customer, this.httpOptions);

  }

  find(id:number): Observable<any>{
    return this.http.get<any>(this.url+ `/api/customer/`+id);
  }

  update(id : number, customer:any): Observable<any>{
    return this.http.put<any>(this.url+ `/api/customer/`+ id, customer, this.httpOptions);
  }

  deleteCustomer(id : any): Observable<any>{
    return this.http.delete<any>(this.url+ `/api/customer/`+ id, this.httpOptions);
  }
}


