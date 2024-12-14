import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private apiUrl='http://localhost:8090/api/equipo'
  constructor(private http: HttpClient) { }

  getEquipos(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(res =>res);
  }

  crearEquipo(equipoData: any): Observable<any> {
    return this.http.post(this.apiUrl, equipoData);
  }

  getEquipo(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
