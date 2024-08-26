import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../model/custom-response';
import { Level } from '../model/level';
import { Option } from '../model/option';
import { StudentSchoolFee } from '../model/student-school-fee';

@Injectable({
  providedIn: 'root'
})
export class StudentSchoolFeeService {


  private readonly URL: string = environment.URL + `student-school-fee`;

  constructor(private http: HttpClient) { }


  studentSchoolFees$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  studentSchoolFee$ = (id: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  studentSchoolFeeByOptionAndLevel$ = (option: Option, level: Level) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${option}/${level}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  save$ = (studentSchoolFeeToSave: StudentSchoolFee) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.URL}`, studentSchoolFeeToSave)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  edite$ = (studentSchoolFeeToUpdate: StudentSchoolFee) => <Observable<CustomResponse>>
    this.http.put<CustomResponse>(`${this.URL}`, studentSchoolFeeToUpdate)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );


  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`Error messae : ${error.message}`);
  }
}
