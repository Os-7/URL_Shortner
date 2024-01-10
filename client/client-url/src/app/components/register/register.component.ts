import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = {
    name: '',
    username:'',
    email: '',
    password:''
}

  constructor(
    private validateService: ValidateService, 
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    // Initialization tasks (if any) can be added here
  }
  // Method to handle registration
  onRegisterSubmit(): void {
    // Input fields check
    if (!this.validateService.validateRegister(this.user)) {
      this.toastr.error('Please fill in all fields', 'Error');
      return; // You might want to return here or handle the error appropriately
    }

    //email field check
    if (!this.validateService.validateEmail(this.user.email)) {
      this.toastr.error('Please fill appropriate Email', 'Error');
      return; // You might want to return here or handle the error appropriately
    }

    //Register User
    this.authService.registerUser(this.user).subscribe(data => {
      if(data.success){
        // If validation passes, you can proceed with further actions
        this.toastr.success('Registration successful', 'Success');
        this.router.navigate(['/login']); 
      }else{
        // If validation fails, again register
        this.toastr.error('Registration Failed', 'Error'); 
        this.router.navigate(['/register'])
      }
    })

  }

}  
