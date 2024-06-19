import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../model/custom-response';
import { Speciality } from '../model/speciality';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  private readonly URL: string = environment.URL + 'speciality';

  constructor(private http: HttpClient) { }

  spacialitys$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  speciality$ = (id: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  saveSpeciality$ = (speciality: Speciality) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.URL}`, speciality)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.message}`);
  }
}
