import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsCustomerComponent } from './transactions-customer.component';

describe('TransactionsCustomerComponent', () => {
  let component: TransactionsCustomerComponent;
  let fixture: ComponentFixture<TransactionsCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
