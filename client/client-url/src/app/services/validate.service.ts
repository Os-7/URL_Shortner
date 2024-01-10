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

  /**
   * Validates user registration data.
   *
   * @param user The user object containing registration information.
   * @returns True if the user data is valid; false otherwise.
   */
  validateRegister(user: User): boolean {
    if (!user.name.trim() || !user.email.trim() || !user.username.trim() || !user.password.trim()) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Validates the email format.
   *
   * @param email The email address to be validated.
   * @returns True if the email is in a valid format; false otherwise.
   */
  validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
}
