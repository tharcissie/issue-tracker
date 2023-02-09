import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Projects } from 'src/app/interfaces/Projects';
import { HandleError } from '../../handleError';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = 'http://localhost:4000/api/v3/projects'


  constructor(private http: HttpClient, private handleError: HandleError) { }

  getProjects(): Observable<Projects> {
    return this.http.get<Projects>(this.url)
      .pipe(
        catchError(this.handleError.handleError)
      );
  }

}
