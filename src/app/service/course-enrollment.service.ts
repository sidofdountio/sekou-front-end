import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../model/custom-response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CourseEnrollment } from '../model/course-enrollment';

@Injectable({
  providedIn: 'root'
})
export class CourseEnrollmentService {

  private readonly URL: string = environment.URL + 'courseEnrollment';

  constructor(private http: HttpClient) { }

  coursesEnrollements$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  coursesEnrollement$ = (id: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  saveCourseEnrollement$ = (courseEnrollment: CourseEnrollment) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.URL}`, courseEnrollment)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
