// Import necessary modules and services
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from '../../models/user.model';

// Component decorator with selector, template, style, and encapsulation settings
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  // Initialize user variable of UserProfile type
  user: UserProfile;

  // Constructor with injected services
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  // Lifecycle hook: Component initialization logic goes here
  ngOnInit(): void {
    // Fetch user profile data from the authentication service
    this.authService.getProfile().subscribe(profile => {
      // Set user variable to the user profile data
      this.user = profile.user as UserProfile;
    },
    // Handle error in fetching user profile
    err => {
      console.log(err);
      return false;
    });
  }

  // Function to get the user display name
  getUserDisplayName(): string {
    // Return the username if logged in, otherwise an empty string
    return this.isLoggedIn() ? this.authService.user.username : '';
  }

  // Function to check if the user is logged in
  isLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
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
