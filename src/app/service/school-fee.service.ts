import { Injectable } from '@angular/core';
import { SchoolFee } from '../model/school-fee';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../model/custom-response';
import { Level } from '../model/level';
import { Option } from '../model/option';


@Injectable({
  providedIn: 'root'
})
export class SchoolFeeService {
  private readonly URL: string = environment.URL + `school-fee`;
  constructor(private http: HttpClient) { }
  schoolFees$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  schoolFee$ = (id: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  schoolFeeByOptionAndLevel$ = (option: Option, level: Level) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${option}/${level}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  save$ = (schoolFeeToSave: SchoolFee) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.URL}`, schoolFeeToSave)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  edite$ = (schoolFeeToUpdate: SchoolFee) => <Observable<CustomResponse>>
    this.http.put<CustomResponse>(`${this.URL}`, schoolFeeToUpdate)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );


  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
