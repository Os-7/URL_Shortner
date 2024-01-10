import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShortLinkService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Creates a short link for the provided URL.
   *
   * @param url The original URL to be shortened.
   * @returns An observable with the response from the backend.
   */
  createShortLink(url: string): Observable<any> {
    // Add logic to make an HTTP POST request to your backend API
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.authToken,
    });

    const body = { url: url };

    return this.http.post('http://localhost:3000/url', body, { headers }).pipe(
      catchError((error) => {
        // Handle error here (e.g., log, show a user-friendly message)
        console.error('Error creating short link:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Fetches the short links associated with the authenticated user from the backend.
   *
   * @returns An observable with the response from the backend.
   */
  getUserShortLinks(): Observable<any> {
    // Fetch user's short links from the backend
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.authToken,
    });

    return this.http.get('http://localhost:3000/url/user/short-links', { headers });
  }
}
