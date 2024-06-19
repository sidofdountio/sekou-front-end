import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../model/custom-response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly URL: string = environment.URL + 'course';

  constructor(private http: HttpClient) { }

  courses$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  course$ = (id: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  saveCourse$ = (course: Course) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.URL}`, course)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
