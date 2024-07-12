import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StudentDto } from '../model/student-dto';
import { CustomResponse } from '../model/custom-response';
import { StudentRequest } from '../model/student-request';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly URL: string = environment.URL + 'student';

  constructor(private http: HttpClient) { }

  students$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  student$ = (id: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  saveStudent$ = (student: StudentRequest) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.URL}`, student)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}

