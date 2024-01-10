// Importing necessary modules and components from Angular and Nebular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbActionsModule, NbUserModule, NbSidebarModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ValidateService } from './services/validate.service';
import { AuthGuard } from './gaurd/auth.gaurd';  // Note: 'gaurd' is likely a typo, correct it to 'guard'.
import { FooterComponent } from './components/footer/footer.component';

// Define routes for your application
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    // Declare your application components
    AppComponent,
    DashboardComponent,
    ProfileComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    // Importing required modules for the application
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'default' }),
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot({
      timeOut: 3000, // Set the default timeout for toasts
      positionClass: 'toast-top-right', // Set the position of toasts
      preventDuplicates: true, // Prevent duplicate toasts
    }),
    NbEvaIconsModule,
    NbLayoutModule,
    NbActionsModule,
    NbUserModule,
    NbSidebarModule,
    FormsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('id_token');
        },
      },
    }),
  ],
  providers: [
    // Provide your services and guards here
    ValidateService,
    ToastrService,
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
