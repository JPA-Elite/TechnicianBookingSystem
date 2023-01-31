import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCustomerComponent } from './settings-customer.component';

describe('SettingsCustomerComponent', () => {
  let component: SettingsCustomerComponent;
  let fixture: ComponentFixture<SettingsCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
