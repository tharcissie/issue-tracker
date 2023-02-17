import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay } from 'rxjs';
import { Issues } from 'src/app/interfaces/issues';
import { HandleError } from '../../handleError';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  url = 'http://localhost:4000/api/v3';
  private cachedIssues$: Observable<Issues> | null;

  constructor(private http: HttpClient, private handleError: HandleError) {}

  getIssues(): Observable<Issues> {
    if (!this.cachedIssues$) {
      this.cachedIssues$ = this.http.get<Issues>(`${this.url}/issues`).pipe(
        map((response) => response),
        shareReplay(1),
        catchError(this.handleError.handleError)
      );
    }
    return this.cachedIssues$;
  }

  addIssue(
    title: string,
    description: string,
    projectID: number,
    screenshot: string
  ): Observable<any> {
    return this.http
      .post<any>(`${this.url}/issue`, {
        title,
        description,
        projectID,
        screenshot,
      })
      .pipe(
        map((response) => response),
        catchError(this.handleError.handleError)
      );
  }

  updateIssue(
    title: string,
    description: string,
    screenshot: string,
    id: number
  ): Observable<any> {
    return this.http
      .patch<any>(`${this.url}/issue/${id}`, { title, description, screenshot })
      .pipe(
        map((response) => response),
        catchError(this.handleError.handleError)
      );
  }

  deleteIssue(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/issue/${id}`).pipe(
      map((response) => response),
      catchError(this.handleError.handleError)
    );
  }

  sendToJira(
    title: string,
    description: string,
    projectID: string
  ): Observable<any> {
    return this.http
      .post<any>(`${this.url}/issuetojira`, { title, description, projectID })
      .pipe(
        map((response) => response),
        catchError(this.handleError.handleError)
      );
  }

  clearCache() {
    this.cachedIssues$ = null;
  }
}
