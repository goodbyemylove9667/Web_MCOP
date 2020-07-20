import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { ColorPickerModule } from 'ngx-color-picker';
import { Select2Module } from 'ng2-select2';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthService } from '../app/auth/auth.service';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { BlockUIModule } from 'ng-block-ui';
import { IconPickerModule } from 'ngx-icon-picker';
const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';
import { ModalModule } from 'ngx-bootstrap/modal';
// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppInterceptor } from './app.interceptor';
import { EmployeesComponent } from './views/employees/employees.component';
import { DataTablesModule } from 'angular-datatables';
import { CookieService } from 'ngx-cookie-service';
import { CustomersComponent } from './views/customers/customers.component';
import { AuthinfoComponent } from './views/authinfo/authinfo.component';
import { ChangepassComponent } from './views/changepass/changepass.component';
import { IncludesComponent } from './views/includes/includes.component';
import { ContestsComponent } from './views/contests/contests.component';
import { QuestionsComponent } from './views/questions/questions.component';
import { TopicsComponent } from './views/topics/topics.component';
import { ResultsComponent } from './views/results/results.component';
import { MenusComponent } from './views/menus/menus.component';
import { GroupsComponent } from './views/groups/groups.component';
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'adminIQ'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,
    ChartsModule,
    DataTablesModule,
    NgbModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
    BlockUIModule.forRoot(),
    ColorPickerModule,
    Select2Module,
    IconPickerModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    EmployeesComponent,
    CustomersComponent,
    AuthinfoComponent,
    ChangepassComponent,
    IncludesComponent,
    ContestsComponent,
    QuestionsComponent,
    TopicsComponent,
    ResultsComponent,
    MenusComponent,
    GroupsComponent
  ],
  providers: [AuthService,CookieService , {
    provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
