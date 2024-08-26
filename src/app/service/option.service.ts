import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../model/custom-response';
import { Option } from '../model/option';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private readonly URL: string = environment.URL + 'option';

  constructor(private http: HttpClient) { }

  options$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  option$ = (id: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  saveOption$ = (option: Option) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.URL}`, option)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  deleteOption$ = (id: number) => <Observable<CustomResponse>>
    this.http.delete<CustomResponse>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
