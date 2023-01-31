import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications-technician',
  templateUrl: './notifications-technician.component.html',
  styleUrls: ['./notifications-technician.component.css']
})
export class NotificationsTechnicianComponent {
  imageCertificateDirectory: any = "http://localhost:8000/storage/cer_images/";
  imageCustomerDirectory: any = "http://localhost:8000/storage/tech_profile_images/";
}
