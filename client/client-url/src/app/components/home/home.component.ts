// Import necessary modules and services
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Component decorator with selector, template, style, and encapsulation settings
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None, // Disabling view encapsulation for global styles
})
export class HomeComponent implements OnInit {
  // Constructor with injected services
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  // Lifecycle hook: Component initialization logic goes here
  ngOnInit(): void {
    // You can add initialization logic if needed
  }

  // Function to check if the user is logged in
  isLoggedIn(): boolean {
    return this.authService.isUserLoggedIn(); // Adjust based on your authentication service
  }

  // Function to handle logout action
  onLogoutClick() {
    this.authService.logout(); // Call logout method from the authentication service
    this.toastr.success('Logged Out Successfully'); // Display success message using Toastr
    this.router.navigate(['/login']); // Navigate to the login page
    return false;
  }
}
