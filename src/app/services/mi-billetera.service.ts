import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiBilleteraService {
  private apiUrl = 'http://localhost:8090/api/usuario/addfondos';
  constructor(private http: HttpClient) { }

  agregarFondos(id: number, monto: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { fondos: monto });
  }

  

}
