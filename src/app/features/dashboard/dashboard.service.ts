import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { DashboardTotaisDto, PessoaDto } from '@models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:5136/api/pessoas'; 

  constructor(private http: HttpClient) { }

  GetPessoas(search?: string): Observable<PessoaDto[]> {
    let params = new HttpParams;

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PessoaDto[]>(this.apiUrl, { params }).pipe(
      catchError((error: HttpErrorResponse) => 
        throwError(() => new Error(`Erro ${error.status}: ${error.message}`))
      )
    );
  }

  GetTotaisDashboard(): Observable<DashboardTotaisDto> {
    return this.http.get<DashboardTotaisDto>(`${this.apiUrl}/dashboard`).pipe(
      catchError((error: HttpErrorResponse) => 
        throwError(() => new Error(`Erro ${error.status}: ${error.message}`))
      )
    );
  }

  PostPessoa(pessoa: PessoaDto): Observable<PessoaDto> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<PessoaDto>(this.apiUrl, pessoa, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => 
        throwError(() => new Error(`Erro ${error.status}: ${error.message}`))
      )
    );
  }

  PutPessoa(codigo: number, pessoa: PessoaDto): Observable<PessoaDto> {
    return this.http.put<PessoaDto>(`${this.apiUrl}/${codigo}`, pessoa).pipe(
      catchError((error: HttpErrorResponse) => 
        throwError(() => new Error(`Erro ${error.status}: ${error.message}`))
      )
    );
  }

  DeletePessoa(codigo: number): Observable<PessoaDto> {
    return this.http.delete<PessoaDto>(`${this.apiUrl}/${codigo}`).pipe(
      catchError((error: HttpErrorResponse) => 
        throwError(() => new Error(`Erro ${error.status}: ${error.message}`))
      )
    );
  }

}