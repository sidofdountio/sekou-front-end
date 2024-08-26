import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../model/custom-response';
import { School } from '../model/school';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private readonly URL: string = environment.URL + `school`;
  constructor(private http: HttpClient) { }

  school$ = (id: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  save$ = (schoolToSave: School) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.URL}`, schoolToSave)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  edite$ = (schoolToUpdate: School) => <Observable<CustomResponse>>
    this.http.put<CustomResponse>(`${this.URL}`, schoolToUpdate)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );


  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
