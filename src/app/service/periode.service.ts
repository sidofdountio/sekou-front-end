import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../model/custom-response';
import { AssessmentPeriod } from '../model/assessment-period';

@Injectable({
  providedIn: 'root'
})
export class PeriodeService {

  private readonly URL: string = environment.URL + 'period';

  constructor(private http: HttpClient) { }

  periodes$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  period$ = (id: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  save$ = (period: AssessmentPeriod) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.URL}`, period)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
