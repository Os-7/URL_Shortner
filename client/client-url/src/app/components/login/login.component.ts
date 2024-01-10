import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    // Your authentication logic goes here
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data && data.success) {
        if (data.token && data.user) {
          this.authService.storeUserData(data.token, data.user);
          this.toastr.success('Logged In', 'Success');
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.error('Token or user information is missing', 'Error');
        }
      } else {
        if (data && data.msg) {
          this.toastr.error(data.msg, 'Error');
        } else {
          this.toastr.error('Unknown error occurred during authentication', 'Error');
        }
        this.router.navigate(['/login']);
      }
    });
  }
}
