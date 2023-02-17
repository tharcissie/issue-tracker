import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay } from 'rxjs';
import { Projects } from 'src/app/interfaces/Projects';
import { HandleError } from '../../handleError';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  url = 'http://localhost:4000/api/v3/projects';
  private cachedProjects$: Observable<Projects> | null ;

  constructor(private http: HttpClient, private handleError: HandleError) {}

  getProjects(): Observable<Projects> {
    if (!this.cachedProjects$) {
      this.cachedProjects$ = this.http.get<Projects>(this.url).pipe(
        map((response) => response),
        shareReplay(1),
        catchError(this.handleError.handleError)
      );
    }
    return this.cachedProjects$;
  }

  clearCache() {
    this.cachedProjects$ = null;
  }

}
