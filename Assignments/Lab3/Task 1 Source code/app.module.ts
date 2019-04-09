import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

import {AppComponent} from './app.component';
import {UserAddComponent } from './user-add/user-add.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularMaterialModule} from './angular-material/angular-material.module';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {CustomerAddComponent} from './customer-add/customer-add.component';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserTemplateComponent} from './user-template/user-template.component';
import {BooksComponent} from './books/books.component';
import {EnrollmentsComponent} from './enrollments/enrollments.component';

@NgModule({
  declarations: [
    AppComponent,
    UserAddComponent ,
    CustomerDetailComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    UserLoginComponent,
      UserProfileComponent,
      UserTemplateComponent,
	  BooksComponent,
      EnrollmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
