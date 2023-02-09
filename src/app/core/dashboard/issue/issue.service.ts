import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Issues } from 'src/app/interfaces/issues';
import { HandleError } from '../../handleError';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  url = 'http://localhost:4000/api/v3/issues'


  constructor(private http: HttpClient, private handleError: HandleError) { }

  getIssues(): Observable<Issues> {
    return this.http.get<Issues>(this.url)
      .pipe(
        catchError(this.handleError.handleError)
      );
  }

}
