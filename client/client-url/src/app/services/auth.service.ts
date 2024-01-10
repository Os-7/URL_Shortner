import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

interface AuthResponse {
  success: boolean;
  msg?: string;
  token?: string;
  user?: any;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient,private jwtHelper: JwtHelperService) { 
        // Initialize authToken and user based on localStorage
        this.authToken = localStorage.getItem('id_token');
        this.user = JSON.parse(localStorage.getItem('user') || '{}');    
  }

  //Register User
  registerUser(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/users/register',user,{headers: headers})
    .pipe(
      catchError(error => throwError(error)),
      map(res => res)
    );
  }

  //Authenticate User
  authenticateUser(user: any): Observable<AuthResponse>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers: headers})
    .pipe(
      catchError(error => throwError(error)),
      map(res => res as AuthResponse)
    );
  }

  //Get Profile
  getProfile(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    this.loadToken();
    return this.http.get('http://localhost:3000/users/profile',{headers: headers})
    .pipe(
      catchError(error => throwError(error)),
      map(res =>{
        const authResponse = res as AuthResponse;
        return authResponse;
      }) 
    );
  }

  //Getting Token and storing
  storeUserData(token: string, user: any): void{
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  //Fetching Token
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  //logout
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // Check if the user is logged in
  isUserLoggedIn(): boolean {
    return !!this.authToken; // Returns true if authToken is truthy (not null or undefined)
  }

  loggedin(){
    return !this.jwtHelper.isTokenExpired(this.authToken)
  }
}
