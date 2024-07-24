import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../model/custom-response';
import { Level } from '../model/level';
import { Assessment } from '../model/assessment';
import { Option } from '../model/option';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  private readonly URL: string = environment.URL + `assessment`;

  constructor(private http: HttpClient) { }

  assessments$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  assessment$ = (id: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  assessmentByOptionAndLevelAndYear$ = (option:Option,level:Level,year:any) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${option}/${level}/${year}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  save$ = (assessment: Assessment) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.URL}`, assessment)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );


  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
