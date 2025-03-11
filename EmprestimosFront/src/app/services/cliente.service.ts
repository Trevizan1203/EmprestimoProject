import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError,} from 'rxjs';
import {ClienteModel} from '../models/cliente-model';
import {EmprestimoModel} from '../models/emprestimo-model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) { }

  getClienteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getClientes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllClientes`).pipe(
      catchError(this.handleError)
    );
  }

  registerCliente(clienteData: ClienteModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, clienteData).pipe(
      catchError(this.handleError)
    );
  }

  deleteClienteById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  editClienteById(cliente: ClienteModel): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${cliente.id}`, cliente).pipe(
      catchError(this.handleError)
    );
  }

  getClienteEmprestimos(id: number): Observable<any> {
    return this.http.get<EmprestimoModel[]>(`${this.apiUrl}/getEmprestimos/${id}`).pipe(
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
