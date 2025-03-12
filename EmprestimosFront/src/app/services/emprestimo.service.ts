import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EmprestimoModel} from '../models/emprestimo-model';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {
  private apiUrl = 'http://localhost:8080/emprestimos';

  constructor(private http: HttpClient) { }

  createEmprestimo(emprestimoData: EmprestimoModel): Observable<EmprestimoModel> {
    return this.http.post<any>(`${this.apiUrl}/create`, emprestimoData).pipe(
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

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "Erro desconhecido";

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // leitura da exception do backend
      if (error.status === 404) {
        errorMessage = 'Cliente não encontrado';
      } else if (error.status === 409) {
        errorMessage = error.error || 'Conflito ao processar a solicitação';
      } else {
        errorMessage = `Código de erro: ${error.status}, mensagem: ${error.message}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
