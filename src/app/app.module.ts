import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListeUserComponent } from './user/liste-user.component';
import { DetailUserComponent } from './user/detail-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormUserComponent } from './form-user/form-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbdModalComponent } from './delete-user/delete-user.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/auth.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard} from './auth/auth-guard.service';
import { EmailInterceptor } from './interceptor/http.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListeUserComponent,
    DetailUserComponent,
    AddUserComponent,
    EditUserComponent,
    FormUserComponent,
    NgbdModalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [AuthGuard, 
    AuthService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : EmailInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
