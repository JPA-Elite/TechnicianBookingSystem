import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-req-technician',
  templateUrl: './req-technician.component.html',
  styleUrls: ['./req-technician.component.css']
})
export class ReqTechnicianComponent implements OnInit {
  customers: any;
  @ViewChild('index') index!: ElementRef;
  @ViewChild('mess') mess!: ElementRef;
  @ViewChild('loc') loc!: ElementRef;
  @ViewChild('em') em!: ElementRef;
  @ViewChild('ph') ph!: ElementRef;
  @ViewChild('ti') ti!: ElementRef;
  @ViewChild('da') da!: ElementRef;

  selectedIndex!: number;
  userSelected! : any;

  constructor(private articlesService: ArticleService, @Inject(DOCUMENT) document: Document) {}

  setIndex(index: number, id : number) {
     this.selectedIndex = index;
     const idParse = Number(id);
     this.articlesService.find(idParse).subscribe((data:any) => {
      this.userSelected = data;

      this.index.nativeElement.innerHTML = index + 1;
      this.mess.nativeElement.innerHTML = this.userSelected.name;
      this.loc.nativeElement.innerHTML = this.userSelected.address;
      this.em.nativeElement.innerHTML = this.userSelected.email;
      this.ph.nativeElement.innerHTML = "(+63) " + this.userSelected.phone + " - Philippine Phone Number";
      this.ti.nativeElement.innerHTML = this.userSelected.created_at;
      this.da.nativeElement.innerHTML = this.userSelected.created_at;

    });

  }
  showCustomers() {
    this.customers = this.articlesService
      .listCustomers()
      .subscribe((customer) => {
        this.customers = customer;
        console.log(this.customers);
      });
  }

  // deleteCustomer(id: any) {
  //   this.articlesService.deleteCustomer(id).subscribe(
  //     res => {
  //       this.customers = this.customers.filter((a: any) => a.id != id);
  //     });

  //   this.router.navigateByUrl('/transactions');

  // }

  ngOnInit(): void {
    this.showCustomers();


  }
}
