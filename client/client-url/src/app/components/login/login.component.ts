// Import necessary modules and services
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Component decorator with selector, template, style, and encapsulation settings
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Initialize username and password variables
  username: string = '';
  password: string = '';

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

  // Function to handle login form submission
  onLoginSubmit() {
    // Your authentication logic goes here
    const user = {
      username: this.username,
      password: this.password
    }

    // Authenticate user using the authService
    this.authService.authenticateUser(user).subscribe(data => {
      // Check if authentication was successful
      if (data && data.success) {
        // Check if both token and user information are present
        if (data.token && data.user) {
          // Store user data and navigate to the dashboard
          this.authService.storeUserData(data.token, data.user);
          this.toastr.success('Logged In', 'Success');
          this.router.navigate(['/dashboard']);
        } else {
          // Handle the case where token or user information is missing
          this.toastr.error('Token or user information is missing', 'Error');
        }
      } else {
        // Handle cases where authentication was not successful
        if (data && data.msg) {
          // Display error message if available in the response
          this.toastr.error(data.msg, 'Error');
        } else {
          // Display a generic error message for unknown errors
          this.toastr.error('Unknown error occurred during authentication', 'Error');
        }
        // Navigate back to the login page
        this.router.navigate(['/login']);
      }
    });
  }
}
