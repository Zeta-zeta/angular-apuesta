import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable,  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8090/api/autenticacion';
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    // Enviando los parámetros como parte de la query
    return this.http.post<any>(`${this.apiUrl}/login?email=${email}&password=${password}`, {});
  }

}
