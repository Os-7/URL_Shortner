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
  urlInput: string = '';
  userShortLinks: any[] = [];

  constructor(
    private authService: AuthService,
    private shortLinkService: ShortLinkService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Fetch user's short links on component initialization
    this.fetchUserShortLinks();
  }

  createShortLink() {
    this.shortLinkService.createShortLink(this.urlInput).subscribe(
      (response) => {
        // Handle successful response
        this.toastr.success('Short link created successfully!', 'Success');
        this.fetchUserShortLinks();
      },
      (error) => {
        // Handle error response
        this.toastr.error('Error creating short link', 'Error');
      }
    );
  }
  fetchUserShortLinks(): void {
    this.shortLinkService.getUserShortLinks().subscribe(
      (response) => {
        // Assuming the response is an array of short links
        this.userShortLinks = response.map((link: any) => {
          return new ShortLink(link.id, link.requiredURL, `http://localhost:3000/short/${link.shortId}`, link.visitHistory);
        });
      },
      (error) => {
        console.error('Error Fetching User Short Links:', error);
        // You can handle errors here (e.g., display error message)
      }
    );
  }
}
