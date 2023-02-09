import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Get the token from your preferred location (e.g., local storage)
    let localStorageUser = localStorage.getItem('currentUser');
    let currentUser = localStorageUser ? JSON.parse(localStorageUser) : undefined
    let token = currentUser ? currentUser.token : undefined
    
    // If the token is available, add it to the headers
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
