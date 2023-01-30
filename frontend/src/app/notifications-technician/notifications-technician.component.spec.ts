import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsTechnicianComponent } from './notifications-technician.component';

describe('NotificationsTechnicianComponent', () => {
  let component: NotificationsTechnicianComponent;
  let fixture: ComponentFixture<NotificationsTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsTechnicianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
