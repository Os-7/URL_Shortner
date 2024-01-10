// Import necessary modules and services
import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

// Component decorator with selector, template, and style settings
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // User object with registration form fields
  user = {
    name: '',
    username: '',
    email: '',
    password: ''
  }

  // Constructor with injected services
  constructor(
    private validateService: ValidateService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  // Lifecycle hook: Component initialization logic goes here
  ngOnInit(): void {
    // Initialization tasks (if any) can be added here
  }

  // Method to handle user registration
  onRegisterSubmit(): void {
    // Input fields check
    if (!this.validateService.validateRegister(this.user)) {
      this.toastr.error('Please fill in all fields', 'Error');
      return; // You might want to return here or handle the error appropriately
    }

    // Email field check
    if (!this.validateService.validateEmail(this.user.email)) {
      this.toastr.error('Please fill in a valid email', 'Error');
      return; // You might want to return here or handle the error appropriately
    }

    // Register User
    this.authService.registerUser(this.user).subscribe(data => {
      if (data.success) {
        // If registration is successful, show success message and navigate to login
        this.toastr.success('Registration successful', 'Success');
        this.router.navigate(['/login']);
      } else {
        // If registration fails, show error message and stay on the registration page
        this.toastr.error('Registration Failed', 'Error');
        // Alternatively, you can provide more specific error messages based on the response data
        this.router.navigate(['/register']);
      }
    });
  }
}
