import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../model/custom-response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CourseOffering } from '../model/course-offering';
import { Option } from '../model/option';
import { Level } from '../model/level';

@Injectable({
  providedIn: 'root'
})
export class CourseOfferingServiceService {

  private readonly URL: string = environment.URL + `course-offering`;

  constructor(private http: HttpClient) { }

  coursesOfferings$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  coursesOffering$ = (id: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  coursesOfferingByOptionAndLevelAndYear$ = (option:Option,level:Level,year:any) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${option}/${level}/${year}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  save$ = (courseOfferingToSave: CourseOffering) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.URL}`, courseOfferingToSave)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );


  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
