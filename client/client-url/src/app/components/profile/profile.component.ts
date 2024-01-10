// Import necessary modules and services
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfile } from '../../models/user.model';

// Component decorator with selector, template, and style settings
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // Initialize user variable of UserProfile type
  user: UserProfile;

  // Constructor with injected AuthService
  constructor(private authService: AuthService) { }

  // Lifecycle hook: Component initialization logic goes here
  ngOnInit(): void {
    // Fetch user profile data from the authentication service
    this.authService.getProfile().subscribe(
      // Success callback
      profile => {
        console.log(profile); // Log the profile data for debugging
        this.user = profile.user as UserProfile; // Set user variable to the user profile data
      },
      // Error callback
      err => {
        console.log(err); // Log any errors for debugging
        return false;
      }
    );
  }
}
