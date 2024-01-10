import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfile } from '../../models/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
user:UserProfile;
  constructor( 
    private authService:AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(profile => {
      console.log(profile); 
      this.user = profile.user as UserProfile;
    },
    err=>{
      console.log(err);
      return false;
    })
  }

}
