import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../model/custom-response';
import { Level } from '../model/level';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private readonly URL: string = environment.URL + 'level';

  constructor(private http: HttpClient) { }

  levels$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  level$ = (id: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  saveLevel$ = (level: Level) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.URL}`, level)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  // uploadOfferImageUrl(formaData: FormData, id: number): Observable<HttpEvent<string>> {
  //   return this.http.post<string>(`${this.URL}/upload/${id}`, formaData, { observe: 'events', reportProgress: true })
  //     .pipe(
  //       tap(console.log),
  //       catchError(this.handlerError)
  //     )
  // }

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
