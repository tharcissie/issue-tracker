import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HandleError } from '../../handleError';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:4000/api/v3/auth/user'

  constructor(private http: HttpClient, private handleError: HandleError) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.url)
      .pipe(
        catchError(this.handleError.handleError)
      );
  }
}
