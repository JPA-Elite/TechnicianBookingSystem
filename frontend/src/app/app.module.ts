import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ApplyComponent } from './apply/apply.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SettingsTechnicianComponent } from './settings-technician/settings-technician.component';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReqTechnicianComponent } from './req-technician/req-technician.component';
import { TransactionsTechnicianComponent } from './transactions-technician/transactions-technician.component';
import { DataTablesModule } from 'angular-datatables';
import { NotificationsTechnicianComponent } from './notifications-technician/notifications-technician.component';
import { CustomerNavComponent } from './customer-nav/customer-nav.component';
import { ReqCustomerComponent } from './req-customer/req-customer.component';
import { TransactionsCustomerComponent } from './transactions-customer/transactions-customer.component';
import { SettingsCustomerComponent } from './settings-customer/settings-customer.component';
import { NotificationCustomerComponent } from './notification-customer/notification-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    NewArticleComponent,
    EditArticleComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ApplyComponent,
    LandingPageComponent,
    CustomerComponent,
    CustomerRegisterComponent,
    AboutUsComponent,
    SettingsTechnicianComponent,
    ReqTechnicianComponent,
    TransactionsTechnicianComponent,
    NotificationsTechnicianComponent,
    CustomerNavComponent,
    ReqCustomerComponent,
    TransactionsCustomerComponent,
    SettingsCustomerComponent,
    NotificationCustomerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MdbCheckboxModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    DataTablesModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
