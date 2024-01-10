import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
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
