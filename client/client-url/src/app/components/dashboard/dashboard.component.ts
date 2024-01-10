// Import necessary modules and services
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShortLinkService } from 'src/app/services/short-link.service';
import { ToastrService } from 'ngx-toastr';
import { ShortLink } from 'src/app/models/short-link.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Initialize variables for input and user short links
  urlInput: string = '';
  userShortLinks: any[] = [];

  // Constructor with injected services
  constructor(
    private authService: AuthService,
    private shortLinkService: ShortLinkService,
    private toastr: ToastrService
  ) { }

  // Lifecycle hook: Fetch user's short links on component initialization
  ngOnInit(): void {
    this.fetchUserShortLinks();
  }

  // Function to create a short link
  createShortLink() {
    this.shortLinkService.createShortLink(this.urlInput).subscribe(
      (response) => {
        // Handle successful response
        this.toastr.success('Short link created successfully!', 'Success');
        this.fetchUserShortLinks(); // Fetch updated short links
      },
      (error) => {
        // Handle error response
        this.toastr.error('Error creating short link', 'Error');
      }
    );
  }

  // Function to fetch user's short links
  fetchUserShortLinks(): void {
    this.shortLinkService.getUserShortLinks().subscribe(
      (response) => {
        // Assuming the response is an array of short links
        this.userShortLinks = response.map((link: any) => {
          // Create ShortLink objects from the response data
          return new ShortLink(link.id, link.requiredURL, `http://localhost:3000/short/${link.shortId}`, link.visitHistory);
        });
      },
      (error) => {
        // Log and handle errors (e.g., display error message)
        console.error('Error Fetching User Short Links:', error);
      }
    );
  }
}
