import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apuesta } from '../interfaces/apuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class HistorialApuestasService {
  private apiUrl='http://localhost:8090/api/apuesta'
  constructor(private http: HttpClient) { }

  getApuestas():Observable<Apuesta[]>{
    return this.http.get<Apuesta[]>(this.apiUrl).pipe(res =>res);
  }

  getApuestasPorUsuario(usuarioId: number): Observable<Apuesta[]> {
    return this.http.get<Apuesta[]>(`${this.apiUrl}/queryUsuario?usuarioId=${usuarioId}`);
  }
}
