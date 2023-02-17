import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { HandleError } from '../handleError';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:4000/api/v3/auth';

  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  currentUser = localStorage.getItem('currentUser');

  constructor(
    private http: HttpClient,
    private router: Router,
    private handleError: HandleError
  ) {
    this.userSubject = new BehaviorSubject<any>(
      this.currentUser ? JSON.parse(this.currentUser) : null
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  adminLogin(email: string) {
    return this.http.post<any>(`${this.url}/signin`, { email }).pipe(
      map((data) => {
        let user: User = data.data;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );
  }

  signUp(
    key: string,
    first_name: string,
    last_name: string,
    organisation: string,
    representative: string
  ) {
    return this.http
      .post<any>(`${this.url}/signup/${key}`, {
        first_name,
        last_name,
        organisation,
        representative,
      })
      .pipe(
        map((response) => response),
        catchError(this.handleError.handleError)
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
