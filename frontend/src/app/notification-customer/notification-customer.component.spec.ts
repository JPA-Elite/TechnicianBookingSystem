import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCustomerComponent } from './notification-customer.component';

describe('NotificationCustomerComponent', () => {
  let component: NotificationCustomerComponent;
  let fixture: ComponentFixture<NotificationCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
