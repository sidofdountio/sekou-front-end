import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../model/custom-response';
import { TeacherDto } from '../model/teacher-dto';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private readonly URL: string = environment.URL + `teacher`

  constructor(private http: HttpClient) { }

  teachers$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  teacher$ = (id: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  save$ = (dto: TeacherDto) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.URL}`, dto)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
