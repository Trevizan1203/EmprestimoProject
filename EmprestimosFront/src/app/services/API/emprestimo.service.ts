import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EmprestimoModel} from '../../models/emprestimo-model';
import {catchError, Observable, throwError} from 'rxjs';
import {EmprestimoChartModel} from '../../models/emprestimo-chart-model';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {
  private apiUrl = 'http://localhost:8080/emprestimos';

  constructor(private http: HttpClient) { }

  createEmprestimo(emprestimoData: EmprestimoModel): Observable<EmprestimoModel> {
    return this.http.post<any>(`${this.apiUrl}`, emprestimoData).pipe(
      catchError(this.handleError)
    )
  }

  updateEmprestimo(emprestimo: EmprestimoModel): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${emprestimo.id}`, emprestimo).pipe(
      catchError(this.handleError)
    )
  }

  deleteEmprestimo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  getEmprestimosInfo(): Observable<EmprestimoChartModel[]> {
    return this.http.get<EmprestimoChartModel[]>(`${this.apiUrl}/info`).pipe(
      catchError(this.handleError)
    )
  }

  pagarEmprestimo(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/pagar/${id}`, { status: 'pago' }).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = `${error.status}: ${error.error}`;
    return throwError(() => new Error(errorMessage));
  }
}
