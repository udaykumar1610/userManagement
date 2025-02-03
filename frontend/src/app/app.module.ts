import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { JwtModule } from '@auth0/angular-jwt';           // Import JwtModule

import { AuthService } from './auth.service';           // Add AuthService
import { UserService } from './user.service';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { UserInfoService } from './user-info.service';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { UserdataComponent } from './userdata/userdata.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { UsersdataComponent } from './usersdata/usersdata.component';

import { ProfileComponent } from './profile/profile.component';
 


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserdashboardComponent,
    AdmindashboardComponent,
    FooterComponent,
    UserComponent,
    AdminComponent,
    UserdataComponent,
    HomeComponent,
    HeaderComponent,
    UsersdataComponent,
 
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),  // JWT Token from localStorage
        allowedDomains: ['localhost:5000'], // Replace with your server's domain
        disallowedRoutes: ['localhost:5000/api/auth/login', 'localhost:5000/api/auth/register'],  // Exclude login/register
      },
    }),
  ],
  providers: [AuthService, UserService,UserInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
