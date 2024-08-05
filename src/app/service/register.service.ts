import { Injectable } from '@angular/core';
import { RegisterDto } from '../model/register-dto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../model/custom-response';
import { Register } from '../model/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly URL: string = environment.URL + 'registration';

  constructor(private http: HttpClient) { }

  registers$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  register$ = (id: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  save$ = (registed: Register) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.URL}`, registed)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
