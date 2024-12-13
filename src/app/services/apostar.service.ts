import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApostarService {
  private apiUrlPartido='http://localhost:8090/api/partido'
  private apiUrl='http://localhost:8090/api/apuesta'

  constructor(
    private http:HttpClient
  ) { }

  crearApuesta(apuestaData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, apuestaData);
  }

  obtenerDetallesPartido(idPartido: number): Observable<any> {
    return this.http.get(`${this.apiUrlPartido}/${idPartido}`).pipe(res =>res);
  }

  getApuestas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
