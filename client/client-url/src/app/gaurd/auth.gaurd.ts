// Import necessary modules and services
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Injectable decorator for service registration
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  // Constructor with injected AuthService and Router
  constructor(private authService: AuthService, private router: Router) {}

  // canActivate method to check if the route can be activated
  canActivate() {
    // Check if the user is logged in
    if (this.authService.loggedIn()) {
      return true; // If logged in, allow access to the route
    } else {
      // If not logged in, redirect to the login page and deny access
      this.router.navigate(['/login']);
      return false;
    }
  }
}
