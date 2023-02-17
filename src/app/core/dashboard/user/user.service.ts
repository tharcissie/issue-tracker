import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay } from 'rxjs';
import { Users } from 'src/app/interfaces/users';
import { HandleError } from '../../handleError';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:4000/api/v3/auth';
  private cachedUsers$: Observable<Users>;

  constructor(private http: HttpClient, private handleError: HandleError) {}

  getUsers(): Observable<Users> {
    if (!this.cachedUsers$) {
      this.cachedUsers$ = this.http.get<Users>(`${this.url}/users`).pipe(
        map((response) => response),
        shareReplay(1),
        catchError(this.handleError.handleError)
      );
    }
    return this.cachedUsers$;
  }

  inviteUser(url: string, projectID: number, email: string): Observable<any> {
    return this.http
      .post<any>(`${this.url}/invite`, { url, projectID, email })
      .pipe(
        map((response) => response),
        catchError(this.handleError.handleError)
      );
  }
}
