import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partido } from '../interfaces/partido.interface';
@Injectable({
  providedIn: 'root'
})
export class PartidosService {
  private apiUrl='http://localhost:8090/api/partido'
  constructor(private http: HttpClient) { }

  getPartidos(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(res =>res);
  }

  getPartido(): Observable<Partido[]> {
    return this.http.get<Partido[]>(this.apiUrl);
  }

  crearPartido(partido: Partial<Partido>): Observable<Partido> {
    return this.http.post<Partido>(this.apiUrl, partido);
  }

  obtenerPartidosProximos(): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${this.apiUrl}/queryEstado?estado=Proximo`);
  }

  obtenerPartidosEnVivo(): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${this.apiUrl}/queryEstado?estado=En vivo`);
  }

  definirResultado(partidoId: number, resultado: { golesLocal: number, golesVisitante: number }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/results/${partidoId}`, resultado);
  }

  cambiarEstadoAEnVivo(partidoId: number): Observable<Partido> {
    return this.http.put<Partido>(`${this.apiUrl}/changeState`, { id: partidoId });
  }
}
