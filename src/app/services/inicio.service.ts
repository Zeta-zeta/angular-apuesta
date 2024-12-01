import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InicioService {
  private apiUrl='http://localhost:8090/api/partido'

  constructor(private http: HttpClient) {}

  getPartidos(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(res =>res);
  }
}
