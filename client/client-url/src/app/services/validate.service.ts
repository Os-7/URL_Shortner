import { Injectable } from '@angular/core';

interface User {
  name: string;
  email: string;
  username: string;
  password: string; 
}

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
  validateRegister(user: User): boolean{
    if (!user.name.trim() || !user.email.trim() || !user.username.trim() || !user.password.trim()) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email: string): boolean{
        const re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email);
    };
}
