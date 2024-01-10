import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable,throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ShortLinkService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createShortLink(url: string): Observable<any> {
    // Add logic to make an HTTP POST request to your backend API
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.authToken,
    });

    const body = { url: url };

    return this.http.post('http://localhost:3000/url', body, { headers });
  }

  getUserShortLinks(): Observable<any> {
    // Fetch user's short links from the backend
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.authToken,
    });

    return this.http.get('http://localhost:3000/url/user/short-links', { headers });
  }
}
