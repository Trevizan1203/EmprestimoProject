import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {UserModel} from '../../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  createUser(userData: UserModel): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, userData).pipe(
      catchError(this.handleError)
    );
  }

  login(userData: UserModel): Observable<String> {
    return this.http.post<String>(`${this.apiUrl}/login`, userData).pipe(
      catchError(this.handleError)
    )
  }

  update(userData:any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}`, userData).pipe(
      catchError(this.handleError)
    )
  }

  getUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = `${error.status}: ${error.error}`;
    return throwError(() => new Error(errorMessage));
  }
}
