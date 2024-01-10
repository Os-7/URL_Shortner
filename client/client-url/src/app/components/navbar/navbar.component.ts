import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  user:UserProfile;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user as UserProfile;
    },
    err=>{
      console.log(err);
      return false;
    })
  }

  getUserDisplayName(): string {
    return this.isLoggedIn() ? this.authService.user.username : '';
  }

  isLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    return this.authService.isUserLoggedIn(); // Adjust this based on your authentication service
  }

  onLogoutClick(){
    this.authService.logout();
    this.toastr.success('Logged Out Successfully')
    this.router.navigate(['/login']);
    return false;
  }
}
