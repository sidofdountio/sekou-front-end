import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { StudentAssessment } from '../model/student-assessment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../model/custom-response';
import { Level } from '../model/level';
import { Option } from '../model/option';

@Injectable({
  providedIn: 'root'
})
export class StudentAssessmentService {


  private readonly URL: string = environment.URL + `student-assessment`;

  constructor(private http: HttpClient) { }

  studentSssessments$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  studentSssessment$ = (id: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  studentAssessmentByOptionAndLevelAndYear$ = (option: Option, level: Level, year: any) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${option}/${level}/${year}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  save$ = (assessment: StudentAssessment) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.URL}`, assessment)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );


  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
