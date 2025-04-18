import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError,} from 'rxjs';
import {ClienteModel} from '../../models/cliente-model';
import {EmprestimoModel} from '../../models/emprestimo-model';

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
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  registerCliente(clienteData: ClienteModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, clienteData).pipe(
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
    let errorMessage = `${error.status}: ${error.error}`;
    return throwError(() => new Error(errorMessage));
  }

}
