import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8090/api/usuario'
  constructor(private http: HttpClient) {}

  actualizarLocalStorageConDatosDelAPI(userId: string): Promise<void> {
    return this.http.get(`${this.apiUrl}/${userId}`).pipe(
      tap((usuarioActualizado: any) => {
        localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
      }),
      catchError(error => {
        console.error('Error al obtener los datos del usuario:', error);
        return of(null); // Retorna un observable vacío en caso de error
      })
    ).toPromise();
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
