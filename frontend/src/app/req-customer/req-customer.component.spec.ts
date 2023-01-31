import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqCustomerComponent } from './req-customer.component';

describe('ReqCustomerComponent', () => {
  let component: ReqCustomerComponent;
  let fixture: ComponentFixture<ReqCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReqCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
